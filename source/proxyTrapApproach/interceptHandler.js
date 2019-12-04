import { $ } from './reference.js'

let originalReflectHas = Reflect.has

Reflect.has = (argument, key) => {
  let target
  // ignore additional arguments for objects requesting native implementation of Reflect.has, as the additional arguments are used in targets that are MultipleDelegation proxies only.
  if (typeof argument === 'object' && originalReflectHas(argument, $.argument)) {
    ;({ target } = argument) // extract target from additional arguments object
    if (Reflect.ownKeys(target).includes(key)) return true
    else {
      argument.target = target |> Object.getPrototypeOf
      return argument.target ? Reflect.has(argument, key) : false
    }
  } else {
    target = argument
    if (Reflect.ownKeys(target).includes(key)) return true
    else {
      target = target |> Object.getPrototypeOf
      return target ? Reflect.has(target, key) : false
    }
  }
}

export const proxyHandler = {
  /** The getPrototypeOf trap could be added, but there is no proper way to return the multiple prototypes.
   * This implies instanceof won't work neither. Therefore,
   * Origianlly befor this implementation, I let it get the prototype of the target, which initially is null.
   */
  getPrototypeOf: target => {
    return target[$.list] // return array of delegated prototypes
  },

  /** 
    The ownKeys trap is a trap for Object.getOwnPropertyNames(). 
    Since ES7, for...in loops keep calling [[GetPrototypeOf]] and getting the own properties of each one. 
    So in order to make it iterate the properties of all prototypes, I use this trap to make all enumerable inherited properties appear like own properties.
  */
  ownKeys(target) {
    let propertyList = new Set()
    // in case a multiple delegation proxy as `target`
    for (let object of target[$.list]) if (object[$.target] !== target) propertyList = new Set([...propertyList, ...Reflect.ownKeys(object)]) // add property keys to the unique set.
    return [...propertyList]
  },

  /** 
    The getOwnPropertyDescriptor trap is a trap for Object.getOwnPropertyDescriptor(). 
    Making all enumerable properties appear like own properties in the ownKeys trap is not enough, for...in loops will get the descriptor to check if they are enumerable. 
    So I use find to find the first prototype which contains that property, and I iterate its prototypical chain until I find the property owner, and I return its descriptor. 
    If no prototype contains the property, I return undefined. The descriptor is modified to make it configurable, otherwise we could break some proxy invariants.
  */
  getOwnPropertyDescriptor(target, property) {
    let object = target[$.list].find(object => {
      if (object[$.target] !== target) return [...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)].includes(property)
    }) // find the object that has that owns the property
    let descriptor
    if (object) {
      descriptor = Object.getOwnPropertyDescriptor(object, property) // try retrieving descriptor on current obj
      descriptor.configurable = true
    } else descriptor = false
    return descriptor
  },

  // The has trap is a trap for the in operator. I use some to check if at least one prototype contains the property.
  has: function(argument, key) {
    console.log('⚫ has:')
    let visitedTargetHash, target
    // check if the first argument holds additional arguments from previous implementation or only the native `target` argument.
    if (originalReflectHas(argument, $.argument)) ({ visitedTargetHash, target } = argument)
    else target = argument
    visitedTargetHash ||= new Set() // follow visited targets that are of type multiple delegation class
    if (visitedTargetHash.has(target)) return // if already visited then the property was not found on it.
    visitedTargetHash.add(target)
    debugger

    return target[$.list].some(object => {
      return Reflect.has({ [$.argument]: true /** mark object as holding additional arguments */, visitedTargetHash, target: object }, key)
    })
  },

  // The setPrototypeOf trap could be added and accept an array of objects, which would replace the prototypes. This is left as an exercice for the reader. Here I just let it modify the prototype of the target, which is not much useful because no trap uses the target.
  setPrototypeOf: (target, prototype /*May accept a single or multiple prototypes*/) => {
    target[$.setter](prototype) // add prototype to delegated list of prototypes
    return true
  },
  // The preventExtensions and defineProperty traps are only included to prevent these operations from modifying the proxy target. Otherwise we could end up breaking some proxy invariants.
  preventExtensions: target => false,
  defineProperty: (target, prop, desc) => false,

  // // The get trap is a trap for getting property values. I use find to find the first prototype which contains that property, and I return the value, or call the getter on the appropriate receiver. This is handled by Reflect.get. If no prototype contains the property, I return undefined.
  // get(target, key, receiver) {
  //   debugger
  //   // allow access to target's MultipleDelegation Functionalities to get the list of delgations.
  //   if (key in target) {
  //     return target[key]
  //   }
  //   let delegationList = target[$.list]
  //   debugger
  //   const parent = delegationList.find(p => key in p)
  //   debugger
  //   return parent ? parent[key] : void 0 // because `undefined` is a global variable and not a reserved word in JS. void simply insures the return of undefined.
  // },

  // // The set trap is a trap for setting property values. I use find to find the first prototype which contains that property, and I call its setter on the appropriate receiver. If there is no setter or no prototype contains the property, the value is defined on the appropriate receiver. This is handled by Reflect.set.
  // set(target, prop, value, receiver) {
  //   var obj = target[$.list].find(obj => prop in obj)
  //   return Reflect.set(obj || Object.create(null), prop, value, receiver)
  // },
}
