import { proxyHandler } from './interceptHandler.js'
import { $ } from './reference.js'

export class MultipleDelegation {
  /*     
  There are more traps available, which are not used
  The deleteProperty trap is a trap for deleting own properties. The proxy represents the inheritance, so this wouldn't make much sense. I let it attempt the deletion on the target, which should have no property anyway.
  The isExtensible trap is a trap for getting the extensibility. Not much useful, given that an invariant forces it to return the same extensibility as the target. So I just let it redirect the operation to the target, which will be extensible.
  The apply and construct traps are traps for calling or instantiating. They are only useful when the target is a function or a constructor.
  */
  static proxyHandler = proxyHandler

  // Trap `instanceof` - check if instance is of MultipleDelegation
  static [Symbol.hasInstance](instance) {
    if (typeof instance == 'object' && instance[$.target]) return Object.getPrototypeOf(instance[$.target]) === this.prototype // get prototype of the actual target not the proxy wrapping it.
  }

  // set prototype
  // Note: 'this' should be the original target not the proxy around it.
  [$.setter](prototype) {
    if (!Array.isArray(prototype)) prototype = [prototype]
    let prototypeList = [...this[$.list], ...prototype] // merge prototype arrays
    this[$.list] = [...new Set(prototypeList)] // filter duplicate enteries.
  }

  constructor() {
    // this = The target is not meant to be accessable externally through the wrapper proxy.
    let target = this
    target[$.list] = [] // initialize multiple delegaiton list property.
    target[$.target] = target
    let proxy = new Proxy(target, MultipleDelegation.proxyHandler)
    // debugging - when console logging it will mark object as proxy and in inspector debugging too.
    target[$.metadata] = {
      type: 'Multiple delegation proxy',
      get delegationList() {
        return target[$.list]
      },
    }
    return { proxy, target }
  }

  /** Support multiple delegated prototype property lookup, where the target's prototype is overwritten by a proxy. */
  static addDelegation({ targetObject, delegationList = [] }) {
    if (delegationList.length == 0) return

    let currentPrototype = targetObject |> Object.getPrototypeOf
    delegationList.unshift(currentPrototype) // Note: duplicates are removed during storage of the prototype array.

    if (!(currentPrototype instanceof MultipleDelegation)) {
      let { proxy } = new MultipleDelegation()
      // Delegate to proxy that will handle and redirect fundamental operations to the appropriate object.
      Object.setPrototypeOf(targetObject, proxy)
    }

    let multipleDelegationProxy = targetObject |> Object.getPrototypeOf // instance of MultipleDelegation class that will be used as the prototype of the target object
    // add delegation prototypes to multiple delelgation proxy.
    multipleDelegationProxy[$.target][$.setter](delegationList)
  }
}
