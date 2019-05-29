/** Support multiple delegated prototype property lookup, where the target's prototype is overwritten by a proxy. */
export function delegateToMultipleObject({ targetObject, delegationList, proxiedPrototypeType = 'object' }) {
  /*     
  There are more traps available, which are not used
  The getPrototypeOf trap could be added, but there is no proper way to return the multiple prototypes. This implies instanceof won't work neither. Therefore, I let it get the prototype of the target, which initially is null.
  The setPrototypeOf trap could be added and accept an array of objects, which would replace the prototypes. This is left as an exercice for the reader. Here I just let it modify the prototype of the target, which is not much useful because no trap uses the target.
  The deleteProperty trap is a trap for deleting own properties. The proxy represents the inheritance, so this wouldn't make much sense. I let it attempt the deletion on the target, which should have no property anyway.
  The isExtensible trap is a trap for getting the extensibility. Not much useful, given that an invariant forces it to return the same extensibility as the target. So I just let it redirect the operation to the target, which will be extensible.
  The apply and construct traps are traps for calling or instantiating. They are only useful when the target is a function or a constructor.
  */
  const proxyHandler = {
    // The get trap is a trap for getting property values. I use find to find the first prototype which contains that property, and I return the value, or call the getter on the appropriate receiver. This is handled by Reflect.get. If no prototype contains the property, I return undefined.
    get(target, key, receiver) {
      const parent = delegationList.find(p => Reflect.has(p, key))
      return parent ? Reflect.get(parent, key, receiver) : void 0 // because `undefined` is a global variable and not a reserved word in JS. void simply insures the return of undefined.
    },
    // The has trap is a trap for the in operator. I use some to check if at least one prototype contains the property.
    has: (target, key) => delegationList.some(p => Reflect.has(p, key)),
    // The set trap is a trap for setting property values. I use find to find the first prototype which contains that property, and I call its setter on the appropriate receiver. If there is no setter or no prototype contains the property, the value is defined on the appropriate receiver. This is handled by Reflect.set.
    set(target, prop, value, receiver) {
      var obj = delegationList.find(obj => prop in obj)
      return Reflect.set(obj || Object.create(null), prop, value, receiver)
    },
    /**
     * The enumerate trap is a trap for for...in loops. I iterate the enumerable properties from the first prototype, then from the second, and so on. Once a property has been iterated, I store it in a hash table to avoid iterating it again.
     * Warning: This trap has been removed in ES7 draft and is deprecated in browsers.
     */
    *enumerate(target) {
      yield* this.ownKeys(target)
    },
    // The ownKeys trap is a trap for Object.getOwnPropertyNames(). Since ES7, for...in loops keep calling [[GetPrototypeOf]] and getting the own properties of each one. So in order to make it iterate the properties of all prototypes, I use this trap to make all enumerable inherited properties appear like own properties.
    ownKeys(target) {
      var hash = Object.create(null)
      for (var obj of delegationList) for (var p in obj) if (!hash[p]) hash[p] = true
      return Object.getOwnPropertyNames(hash)
    },
    // The getOwnPropertyDescriptor trap is a trap for Object.getOwnPropertyDescriptor(). Making all enumerable properties appear like own properties in the ownKeys trap is not enough, for...in loops will get the descriptor to check if they are enumerable. So I use find to find the first prototype which contains that property, and I iterate its prototypical chain until I find the property owner, and I return its descriptor. If no prototype contains the property, I return undefined. The descriptor is modified to make it configurable, otherwise we could break some proxy invariants.
    getOwnPropertyDescriptor(target, prop) {
      function getDesc(obj, prop) {
        var desc = Object.getOwnPropertyDescriptor(obj, prop)
        return desc || (obj = Object.getPrototypeOf(obj) ? getDesc(obj, prop) : void 0)
      }
      var obj = delegationList.find(obj => prop in obj)
      var desc = obj ? getDesc(obj, prop) : void 0
      if (desc) desc.configurable = true
      return desc
    },
    // The preventExtensions and defineProperty traps are only included to prevent these operations from modifying the proxy target. Otherwise we could end up breaking some proxy invariants.
    preventExtensions: target => false,
    defineProperty: (target, prop, desc) => false,
  }

  // creating a new object and using it for the proxy instead of the target object, allows for simplified implementation of trap functions.
  let proxyTarget
  switch (proxiedPrototypeType) {
    case 'function':
      proxyTarget = new Function()
      break
    case 'object':
    default:
      proxyTarget = Object.create(null)
      break
  }
  let proxiedPrototype = new Proxy(proxyTarget, proxyHandler)
  // Delegate to proxy that will handle and redirect fundamental operations to the appropriate object.
  Object.setPrototypeOf(targetObject, proxiedPrototype)
}

// implement multiple super constructors with ability to pass unique arguments for each during instance creation.
export function inheritsMultipleConstructors({ BaseCtor, SuperCtors }) {
  return new Proxy(BaseCtor, {
    construct(_, [baseArgs = [], superArgs = []], newTarget) {
      let instance = {}

      instance = SuperCtors.reduce((acc, Ctor, i) => {
        const args = superArgs[i] || []
        return Object.assign(acc, new Ctor(...args))
      }, instance)

      instance = Object.assign(instance, new BaseCtor(...baseArgs))

      Object.setPrototypeOf(instance, BaseCtor.prototype)
      return instance
    },
  })
}

// create delegation on constructors & prototypes.
export function inheritsMultiple({ BaseCtor, SuperCtors }) {
  delegateToMultipleObject({
    targetObject: BaseCtor.prototype,
    delegationList: SuperCtors.map(Ctor => Ctor.prototype),
  })

  return inheritsMultipleConstructors({ BaseCtor, SuperCtors })
}
