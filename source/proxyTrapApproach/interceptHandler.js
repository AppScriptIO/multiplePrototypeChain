"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.proxyHandler = void 0;


var _reference = require("./reference.js");
var _MultipleDelegationClass = require("./MultipleDelegation.class.js");






Reflect.has = new Proxy(Reflect.has, {
  apply(reflectHas, thisArg, [target, key]) {

    let argument;
    if (typeof key === 'object' && Reflect.ownKeys(key).includes(_reference.$.argument)) {
      argument = key;
      ({ key } = argument);
    }

    if (argument) {
      if (target instanceof _MultipleDelegationClass.MultipleDelegation) {

        return proxyHandler.has(target, argument);
      }

      if (Reflect.ownKeys(target).includes(key)) return true;else
      {var _target;
        target = (_target = target, Object.getPrototypeOf(_target));
        return target ? Reflect.has(target, argument) : false;
      }
    }


    return reflectHas(target, key);
  } });


Reflect.get = new Proxy(Reflect.get, {
  apply(reflectGet, thisArg, [target, key, receiver]) {

    let visitedTargetHash, argument;
    if (typeof receiver === 'object' && Reflect.ownKeys(receiver).includes(_reference.$.argument)) {
      argument = receiver;
      ({ visitedTargetHash, receiver } = argument);
    }

    if (argument) {var _target2;
      if (target instanceof _MultipleDelegationClass.MultipleDelegation) {
        return proxyHandler.get(target[_reference.$.target], key, argument);
      }

      if (!visitedTargetHash.has(target) && Reflect.ownKeys(target).includes(key)) return target[key];

      visitedTargetHash.add(target);

      return Reflect.get((_target2 = target, Object.getPrototypeOf(_target2)), key, {
        [_reference.$.argument]: true,
        visitedTargetHash,
        receiver: receiver || target });

    }


    return reflectGet(target, key, receiver || target);
  } });


const proxyHandler = {




  getPrototypeOf: target => {
    return target[_reference.$.list];
  },


  setPrototypeOf: (target, prototype) => {
    target[_reference.$.setter](prototype);
    return true;
  },






  ownKeys(target) {
    let propertyList = new Set(Reflect.ownKeys(target));

    for (let object of target[_reference.$.list]) if (object[_reference.$.target] !== target) propertyList = new Set([...propertyList, ...Reflect.ownKeys(object)]);
    return [...propertyList];
  },







  getOwnPropertyDescriptor(target, property) {
    if (Reflect.ownKeys(target).includes(property)) return Object.getOwnPropertyDescriptor(target, property);

    let object = target[_reference.$.list].find(object => {
      if (object[_reference.$.target] !== target) return [...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)].includes(property);
    });

    let descriptor;
    if (object) {
      descriptor = Object.getOwnPropertyDescriptor(object, property);
      descriptor.configurable = true;
    }

    return descriptor ? descriptor : undefined;
  },




  has(target, key) {

    let visitedTargetHash;
    if (typeof key === 'object' && Reflect.ownKeys(key).includes(_reference.$.argument)) {
      let argument = key;
      ({ visitedTargetHash, key } = argument);
    }

    if (Reflect.ownKeys(target).includes(key)) return true;

    visitedTargetHash || (visitedTargetHash = new Set());
    if (visitedTargetHash.has(target)) return false;
    visitedTargetHash.add(target);

    return target[_reference.$.list].some(object => {

      if (object !== target)
      return Reflect.has(object, {
        [_reference.$.argument]: true,
        visitedTargetHash,
        key });

    });
  },





  get(target, key, receiver) {
    if (key == '__proto__') return Reflect.getPrototypeOf(receiver);
    if (key in target) return target[key];

    let visitedTargetHash;
    if (typeof receiver === 'object' && Reflect.ownKeys(receiver).includes(_reference.$.argument)) {
      let argument = receiver;
      ({ visitedTargetHash, receiver } = argument);
    }

    visitedTargetHash || (visitedTargetHash = new Set());
    if (visitedTargetHash.has(target)) return false;
    visitedTargetHash.add(target);
    if (receiver) visitedTargetHash.add(receiver);


    let value;
    for (let index = 0; index < target[_reference.$.list].length; index++) {
      let object = target[_reference.$.list][index];
      if (visitedTargetHash.has(object)) continue;
      if (
      Reflect.has(object, {
        [_reference.$.argument]: true,
        visitedTargetHash: new Set([receiver]),
        key }))


      value = Reflect.get(object, key, {
        [_reference.$.argument]: true,
        visitedTargetHash,
        receiver });


      visitedTargetHash.add(object);

      if (value) return value;
    }

    return void 0;
  },






  set(target, property, value, receiver) {

    let foundObject = target[_reference.$.list].find(object => property in object);
    if (foundObject) Reflect.set(foundObject, property, value, receiver);


    return Reflect.set(target, property, value, receiver);
  },


  defineProperty(target, key, descriptor) {
    return Reflect.defineProperty(...arguments);
  },


  preventExtensions: target => false };exports.proxyHandler = proxyHandler;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9wcm94eVRyYXBBcHByb2FjaC9pbnRlcmNlcHRIYW5kbGVyLmpzIl0sIm5hbWVzIjpbIlJlZmxlY3QiLCJoYXMiLCJQcm94eSIsImFwcGx5IiwicmVmbGVjdEhhcyIsInRoaXNBcmciLCJ0YXJnZXQiLCJrZXkiLCJhcmd1bWVudCIsIm93bktleXMiLCJpbmNsdWRlcyIsIiQiLCJNdWx0aXBsZURlbGVnYXRpb24iLCJwcm94eUhhbmRsZXIiLCJPYmplY3QiLCJnZXRQcm90b3R5cGVPZiIsImdldCIsInJlZmxlY3RHZXQiLCJyZWNlaXZlciIsInZpc2l0ZWRUYXJnZXRIYXNoIiwiYWRkIiwibGlzdCIsInNldFByb3RvdHlwZU9mIiwicHJvdG90eXBlIiwic2V0dGVyIiwicHJvcGVydHlMaXN0IiwiU2V0Iiwib2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwicHJvcGVydHkiLCJmaW5kIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImRlc2NyaXB0b3IiLCJjb25maWd1cmFibGUiLCJ1bmRlZmluZWQiLCJzb21lIiwidmFsdWUiLCJpbmRleCIsImxlbmd0aCIsInNldCIsImZvdW5kT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJhcmd1bWVudHMiLCJwcmV2ZW50RXh0ZW5zaW9ucyJdLCJtYXBwaW5ncyI6Ijs7O0FBR0E7QUFDQTs7Ozs7OztBQU9BQSxPQUFPLENBQUNDLEdBQVIsR0FBYyxJQUFJQyxLQUFKLENBQVVGLE9BQU8sQ0FBQ0MsR0FBbEIsRUFBdUI7QUFDbkNFLEVBQUFBLEtBQUssQ0FBQ0MsVUFBRCxFQUFhQyxPQUFiLEVBQXNCLENBQUNDLE1BQUQsRUFBU0MsR0FBVCxDQUF0QixFQUF3RTs7QUFFM0UsUUFBSUMsUUFBSjtBQUNBLFFBQUksT0FBT0QsR0FBUCxLQUFlLFFBQWYsSUFBMkJQLE9BQU8sQ0FBQ1MsT0FBUixDQUFnQkYsR0FBaEIsRUFBcUJHLFFBQXJCLENB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QUF5STFCd0IsRUFBQUEsY0FBYyxDQUFDcEMsTUFBRCxFQUFTQyxHQUFULEVBQWMwQixVQUFkLEVBQTBCO0FBQ3RDLFdBQU9qQyxPQUFPLENBQUMwQyxjQUFSLENBQXVCLEdBQUdDLFNBQTFCLENBQVA7QUFDRCxHQTNJeUI7OztBQThJMUJDLEVBQUFBLGlCQUFpQixFQUFFdEMsTUFBTSxJQUFJLEtBOUlILEVBQXJCLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZXNvdXJjZTogaHR0cHM6Ly9qYXZhc2NyaXB0LmluZm8vcHJveHlcbi8vIGh0dHBzOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvMTAuMC9pbmRleC5odG1sI3NlYy1yZWZsZWN0aW9uXG5cbmltcG9ydCB7ICQgfSBmcm9tICcuL3JlZmVyZW5jZS5qcydcbmltcG9ydCB7IE11bHRpcGxlRGVsZWdhdGlvbiB9IGZyb20gJy4vTXVsdGlwbGVEZWxlZ2F0aW9uLmNsYXNzLmpzJ1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgYXdhcmUgb2YgTXVsdGlwbGVEZWxlZ2F0aW9uIGluc3RhbmNlcyB0byBwcmV2ZW50IHVubmVjZXNzYXJ5IGxvb2t1cHMsIGFuZCBwcmV2ZW50IGNpcmN1bGFyIG9uZXMuXG4gKiBOT1RFOiBVc2FnZSBvZiBwcm94eSBpbnN0ZWFkIG9mIHdyYXBwaW5nIGluIGEgZnVuY3Rpb24gd2lsbCBwcmVzZXJ2ZSBmdW5jdGlvbmFsaXRpZXMsIGZvciB0YXJnZXRzIHRoYXQgYXJlIHByb3hpZXMgdGhlbXNlbHZlcyB3aG8gaGF2ZSBoYW5kbGVycyBmb3IgYGhhc2Agd2hpY2ggd2lsbCBiZSBjYWxsZWQgZmlyc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gYXJndW1lbnQgdGFyZ2V0IG9yIGFkZGl0aW9uYWwgYXJndW1lbnQgY29udGFpbmluZyB0YXJnZXQuIE5vdGU6IFVzZSBga2V5YCAoc2Vjb25kIGFyZ3VtZW50KSBhcyBhZGRpdGlvbmFsIGFyZ3VtZW50IHJhdGhlciB0aGFuIHVzaW5nIGB0YXJnZXRgIChmaXJzdCBhcmd1bWVudCBvZiBoYW5kbGVyKSwgYmVjYXVzZSB3aGVuIGNhbGxpbmcgcmVmbGVjdC5oYXMgb24gdGhlIHByb3h5LCB0aGUgaGFuZGxlciB3aWxsIGJlIG11c3QgdHJpZ2dlcmVkICh1c2luZyB0aGUgdGFyZ2V0IGFzIGFyZ3VtZW50IHdpbGwgbm90IGFsbG93IHRoYXQpLlxuICovXG5SZWZsZWN0LmhhcyA9IG5ldyBQcm94eShSZWZsZWN0Lmhhcywge1xuICBhcHBseShyZWZsZWN0SGFzLCB0aGlzQXJnLCBbdGFyZ2V0LCBrZXkgLyogbWF5IGhvbGQgYWRkaXRpb25hbCBhcmd1bWVudHMqL10pIHtcbiAgICAvLyBpZ25vcmUgYWRkaXRpb25hbCBhcmd1bWVudHMgZm9yIG9iamVjdHMgcmVxdWVzdGluZyBuYXRpdmUgaW1wbGVtZW50YXRpb24gb2YgUmVmbGVjdC5oYXMsIGFzIHRoZSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBhcmUgdXNlZCBpbiB0YXJnZXRzIHRoYXQgYXJlIE11bHRpcGxlRGVsZWdhdGlvbiBwcm94aWVzIG9ubHkuXG4gICAgbGV0IGFyZ3VtZW50XG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnICYmIFJlZmxlY3Qub3duS2V5cyhrZXkpLmluY2x1ZGVzKCQuYXJndW1lbnQpKSB7XG4gICAgICBhcmd1bWVudCA9IGtleVxuICAgICAgOyh7IGtleSB9ID0gYXJndW1lbnQpIC8vIGV4dHJhY3QgdGFyZ2V0IGZyb20gYWRkaXRpb25hbCBhcmd1bWVudHMgb2JqZWN0XG4gICAgfVxuXG4gICAgaWYgKGFyZ3VtZW50KSB7XG4gICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgTXVsdGlwbGVEZWxlZ2F0aW9uKSB7XG4gICAgICAgIC8vICBgcmV0dXJuIHJlZmxlY3RIYXModGFyZ2V0LCBhcmd1bWVudClgIC0gSW1wb3J0YW50IHVzaW5nIHRoZSBuYXRpdmUgcmVmbGVjdCBoYXMgaW1wbGVtZW5hdGF0aW9uIHdpbGwgY29udmVydCB0aGUgYXJndW1lbnQgb2JqZWN0IChpbiBwbGFjZSBvZiBrZXkgcGFyYW1ldGVyKSB0byBzdHJpbmcsIHdoaWNoIHdpbGwgbm90IGFsbG93IHRoZSBwcm94eSBoYW5kbGVyIHRvIHVzZSBpdC5cbiAgICAgICAgcmV0dXJuIHByb3h5SGFuZGxlci5oYXModGFyZ2V0LCBhcmd1bWVudCkgLy8gY2FsbCBwcm94eSBoYW5kbGVyIGRpcmVjdGx5LlxuICAgICAgfVxuXG4gICAgICBpZiAoUmVmbGVjdC5vd25LZXlzKHRhcmdldCkuaW5jbHVkZXMoa2V5KSkgcmV0dXJuIHRydWVcbiAgICAgIGVsc2Uge1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXQgfD4gT2JqZWN0LmdldFByb3RvdHlwZU9mIC8vIHBhc3Mgb24gYXJndW1lbnQgYWRkaXRpb25hbCB2YWx1ZXNcbiAgICAgICAgcmV0dXJuIHRhcmdldCA/IFJlZmxlY3QuaGFzKHRhcmdldCwgYXJndW1lbnQpIDogZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB3aWxsIHRyaWdnZXIgdGhlIG9yaWdpbmFsIFJlZmxlY3QuaGFzLiBJbiBjYXNlIE11bHRpcGxlRGVsZWdhdGlvbiBpbnN0YW5jZSwgdGhlIHByb3h5IGhhbmRsZXIgd2lsbCBiZSB0cmlnZ2VyZWRcbiAgICByZXR1cm4gcmVmbGVjdEhhcyh0YXJnZXQsIGtleSlcbiAgfSxcbn0pXG5cblJlZmxlY3QuZ2V0ID0gbmV3IFByb3h5KFJlZmxlY3QuZ2V0LCB7XG4gIGFwcGx5KHJlZmxlY3RHZXQsIHRoaXNBcmcsIFt0YXJnZXQsIGtleSwgcmVjZWl2ZXIgLyogbWF5IGhvbGQgYWRkaXRpb25hbCBhcmd1bWVudHMqL10pIHtcbiAgICAvLyBpZ25vcmUgYWRkaXRpb25hbCBhcmd1bWVudHMgZm9yIG9iamVjdHMgcmVxdWVzdGluZyBuYXRpdmUgaW1wbGVtZW50YXRpb24gb2YgUmVmbGVjdC5oYXMsIGFzIHRoZSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBhcmUgdXNlZCBpbiB0YXJnZXRzIHRoYXQgYXJlIE11bHRpcGxlRGVsZWdhdGlvbiBwcm94aWVzIG9ubHkuXG4gICAgbGV0IHZpc2l0ZWRUYXJnZXRIYXNoLCBhcmd1bWVudFxuICAgIGlmICh0eXBlb2YgcmVjZWl2ZXIgPT09ICdvYmplY3QnICYmIFJlZmxlY3Qub3duS2V5cyhyZWNlaXZlcikuaW5jbHVkZXMoJC5hcmd1bWVudCkpIHtcbiAgICAgIGFyZ3VtZW50ID0gcmVjZWl2ZXJcbiAgICAgIDsoeyB2aXNpdGVkVGFyZ2V0SGFzaCwgcmVjZWl2ZXIgfSA9IGFyZ3VtZW50KVxuICAgIH1cblxuICAgIGlmIChhcmd1bWVudCkge1xuICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIE11bHRpcGxlRGVsZWdhdGlvbikge1xuICAgICAgICByZXR1cm4gcHJveHlIYW5kbGVyLmdldCh0YXJnZXRbJC50YXJnZXRdLCBrZXksIGFyZ3VtZW50KSAvLyBjYWxsIHByb3h5IGhhbmRsZXIgZGlyZWN0bHksIGFzIHRoZSByZWNlaXZlciBmdW5jdGlvbiB3aWxsIGJlIG92ZXJyaWRlbiBieSB0aGUgbmF0aXZlIGNhbGwuXG4gICAgICB9XG5cbiAgICAgIGlmICghdmlzaXRlZFRhcmdldEhhc2guaGFzKHRhcmdldCkgJiYgUmVmbGVjdC5vd25LZXlzKHRhcmdldCkuaW5jbHVkZXMoa2V5KSkgcmV0dXJuIHRhcmdldFtrZXldXG5cbiAgICAgIHZpc2l0ZWRUYXJnZXRIYXNoLmFkZCh0YXJnZXQpXG5cbiAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQgfD4gT2JqZWN0LmdldFByb3RvdHlwZU9mLCBrZXksIHtcbiAgICAgICAgWyQuYXJndW1lbnRdOiB0cnVlIC8qKiBtYXJrIG9iamVjdCBhcyBob2xkaW5nIGFkZGl0aW9uYWwgYXJndW1lbnRzICovLFxuICAgICAgICB2aXNpdGVkVGFyZ2V0SGFzaCxcbiAgICAgICAgcmVjZWl2ZXI6IHJlY2VpdmVyIHx8IHRhcmdldCxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gd2lsbCB0cmlnZ2VyIHRoZSBvcmlnaW5hbCBSZWZsZWN0Lmhhcy4gSW4gY2FzZSBNdWx0aXBsZURlbGVnYXRpb24gaW5zdGFuY2UsIHRoZSBwcm94eSBoYW5kbGVyIHdpbGwgYmUgdHJpZ2dlcmVkXG4gICAgcmV0dXJuIHJlZmxlY3RHZXQodGFyZ2V0LCBrZXksIHJlY2VpdmVyIHx8IHRhcmdldClcbiAgfSxcbn0pXG5cbmV4cG9ydCBjb25zdCBwcm94eUhhbmRsZXIgPSB7XG4gIC8qKiBUaGUgZ2V0UHJvdG90eXBlT2YgdHJhcCBjb3VsZCBiZSBhZGRlZCwgYnV0IHRoZXJlIGlzIG5vIHByb3BlciB3YXkgdG8gcmV0dXJuIHRoZSBtdWx0aXBsZSBwcm90b3R5cGVzLlxuICAgKiBUaGlzIGltcGxpZXMgaW5zdGFuY2VvZiB3b24ndCB3b3JrIG5laXRoZXIuIFRoZXJlZm9yZSxcbiAgICogT3JpZ2lhbmxseSBiZWZvciB0aGlzIGltcGxlbWVudGF0aW9uLCBJIGxldCBpdCBnZXQgdGhlIHByb3RvdHlwZSBvZiB0aGUgdGFyZ2V0LCB3aGljaCBpbml0aWFsbHkgaXMgbnVsbC5cbiAgICovXG4gIGdldFByb3RvdHlwZU9mOiB0YXJnZXQgPT4ge1xuICAgIHJldHVybiB0YXJnZXRbJC5saXN0XSAvLyByZXR1cm4gYXJyYXkgb2YgZGVsZWdhdGVkIHByb3RvdHlwZXNcbiAgfSxcblxuICAvLyBUaGUgc2V0UHJvdG90eXBlT2YgdHJhcCBjb3VsZCBiZSBhZGRlZCBhbmQgYWNjZXB0IGFuIGFycmF5IG9mIG9iamVjdHMsIHdoaWNoIHdvdWxkIHJlcGxhY2UgdGhlIHByb3RvdHlwZXMuIFRoaXMgaXMgbGVmdCBhcyBhbiBleGVyY2ljZSBmb3IgdGhlIHJlYWRlci4gSGVyZSBJIGp1c3QgbGV0IGl0IG1vZGlmeSB0aGUgcHJvdG90eXBlIG9mIHRoZSB0YXJnZXQsIHdoaWNoIGlzIG5vdCBtdWNoIHVzZWZ1bCBiZWNhdXNlIG5vIHRyYXAgdXNlcyB0aGUgdGFyZ2V0LlxuICBzZXRQcm90b3R5cGVPZjogKHRhcmdldCwgcHJvdG90eXBlIC8qTWF5IGFjY2VwdCBhIHNpbmdsZSBvciBtdWx0aXBsZSBwcm90b3R5cGVzKi8pID0+IHtcbiAgICB0YXJnZXRbJC5zZXR0ZXJdKHByb3RvdHlwZSkgLy8gYWRkIHByb3RvdHlwZSB0byBkZWxlZ2F0ZWQgbGlzdCBvZiBwcm90b3R5cGVzXG4gICAgcmV0dXJuIHRydWVcbiAgfSxcblxuICAvKiogXG4gICAgVGhlIG93bktleXMgdHJhcCBpcyBhIHRyYXAgZm9yIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKCkuIFxuICAgIFNpbmNlIEVTNywgZm9yLi4uaW4gbG9vcHMga2VlcCBjYWxsaW5nIFtbR2V0UHJvdG90eXBlT2ZdXSBhbmQgZ2V0dGluZyB0aGUgb3duIHByb3BlcnRpZXMgb2YgZWFjaCBvbmUuIFxuICAgIFNvIGluIG9yZGVyIHRvIG1ha2UgaXQgaXRlcmF0ZSB0aGUgcHJvcGVydGllcyBvZiBhbGwgcHJvdG90eXBlcywgSSB1c2UgdGhpcyB0cmFwIHRvIG1ha2UgYWxsIGVudW1lcmFibGUgaW5oZXJpdGVkIHByb3BlcnRpZXMgYXBwZWFyIGxpa2Ugb3duIHByb3BlcnRpZXMuXG4gICovXG4gIG93bktleXModGFyZ2V0KSB7XG4gICAgbGV0IHByb3BlcnR5TGlzdCA9IG5ldyBTZXQoUmVmbGVjdC5vd25LZXlzKHRhcmdldCkgLyphZGQgdGhlIHN5bWJvbCBmb3IgdGhlIG9yaWdpbmFsIHRhcmdldCB0byB0aGUgcHJveHkgb3duIGtleXMqLylcbiAgICAvLyBpbiBjYXNlIGEgbXVsdGlwbGUgZGVsZWdhdGlvbiBwcm94eSBhcyBgdGFyZ2V0YFxuICAgIGZvciAobGV0IG9iamVjdCBvZiB0YXJnZXRbJC5saXN0XSkgaWYgKG9iamVjdFskLnRhcmdldF0gIT09IHRhcmdldCkgcHJvcGVydHlMaXN0ID0gbmV3IFNldChbLi4ucHJvcGVydHlMaXN0LCAuLi5SZWZsZWN0Lm93bktleXMob2JqZWN0KV0pIC8vIGFkZCBwcm9wZXJ0eSBrZXlzIHRvIHRoZSB1bmlxdWUgc2V0LlxuICAgIHJldHVybiBbLi4ucHJvcGVydHlMaXN0XVxuICB9LFxuXG4gIC8qKiBcbiAgICBUaGUgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIHRyYXAgaXMgYSB0cmFwIGZvciBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKCkuIFxuICAgIE1ha2luZyBhbGwgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGFwcGVhciBsaWtlIG93biBwcm9wZXJ0aWVzIGluIHRoZSBvd25LZXlzIHRyYXAgaXMgbm90IGVub3VnaCwgZm9yLi4uaW4gbG9vcHMgd2lsbCBnZXQgdGhlIGRlc2NyaXB0b3IgdG8gY2hlY2sgaWYgdGhleSBhcmUgZW51bWVyYWJsZS4gXG4gICAgU28gSSB1c2UgZmluZCB0byBmaW5kIHRoZSBmaXJzdCBwcm90b3R5cGUgd2hpY2ggY29udGFpbnMgdGhhdCBwcm9wZXJ0eSwgYW5kIEkgaXRlcmF0ZSBpdHMgcHJvdG90eXBpY2FsIGNoYWluIHVudGlsIEkgZmluZCB0aGUgcHJvcGVydHkgb3duZXIsIGFuZCBJIHJldHVybiBpdHMgZGVzY3JpcHRvci4gXG4gICAgSWYgbm8gcHJvdG90eXBlIGNvbnRhaW5zIHRoZSBwcm9wZXJ0eSwgSSByZXR1cm4gdW5kZWZpbmVkLiBUaGUgZGVzY3JpcHRvciBpcyBtb2RpZmllZCB0byBtYWtlIGl0IGNvbmZpZ3VyYWJsZSwgb3RoZXJ3aXNlIHdlIGNvdWxkIGJyZWFrIHNvbWUgcHJveHkgaW52YXJpYW50cy5cbiAgKi9cbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcGVydHkpIHtcbiAgICBpZiAoUmVmbGVjdC5vd25LZXlzKHRhcmdldCkuaW5jbHVkZXMocHJvcGVydHkpKSByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3BlcnR5KSAvLyBwcm92aWRlIGFjY2VzcyBmb3Igb3JpZ2luYWwgdGFyZ2V0IGZyb20gcHJveHlcblxuICAgIGxldCBvYmplY3QgPSB0YXJnZXRbJC5saXN0XS5maW5kKG9iamVjdCA9PiB7XG4gICAgICBpZiAob2JqZWN0WyQudGFyZ2V0XSAhPT0gdGFyZ2V0KSByZXR1cm4gWy4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCksIC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KV0uaW5jbHVkZXMocHJvcGVydHkpXG4gICAgfSkgLy8gZmluZCB0aGUgb2JqZWN0IHRoYXQgaGFzIHRoYXQgb3ducyB0aGUgcHJvcGVydHlcblxuICAgIGxldCBkZXNjcmlwdG9yXG4gICAgaWYgKG9iamVjdCkge1xuICAgICAgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSkgLy8gdHJ5IHJldHJpZXZpbmcgZGVzY3JpcHRvciBvbiBjdXJyZW50IG9ialxuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIGRlc2NyaXB0b3IgPyBkZXNjcmlwdG9yIDogdW5kZWZpbmVkXG4gIH0sXG5cbiAgLyoqIFRoZSBoYXMgdHJhcCBpcyBhIHRyYXAgZm9yIHRoZSBpbiBvcGVyYXRvci4gSSB1c2Ugc29tZSB0byBjaGVjayBpZiBhdCBsZWFzdCBvbmUgcHJvdG90eXBlIGNvbnRhaW5zIHRoZSBwcm9wZXJ0eS5cbiAgICogTm90ZTogd2hlbiBjYWxsZWQgdGhyb3VnaCB0aGUgbmF0aXZlIEpTIHJlZmxlY3QuaGFzIGltcGxlbWVudGF0aW9uLCB0aGUga2V5IHdpbGwgYmUgY29udmVydGVkIHRvIHN0cmluZywgaWYgcGFzc2VkIGFuIG9iamVjdC4gVGhlcmVmb3JlLCBpdCBpcyBjYWxsZWQgZGlyZWN0bHkgaW5zdGVhZCB3aGVuIHJlcXVpcmVkLlxuICAgKi9cbiAgaGFzKHRhcmdldCwga2V5IC8qKiBjYW4gYmUgdXNlZCBhcyBhZGRpdGlvbmFsIGFyZ3VtZW50IG9iamVjdCAqLykge1xuICAgIC8vIGNoZWNrIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBob2xkcyBhZGRpdGlvbmFsIGFyZ3VtZW50cyBmcm9tIHByZXZpb3VzIGltcGxlbWVudGF0aW9uIG9yIG9ubHkgdGhlIG5hdGl2ZSBgdGFyZ2V0YCBhcmd1bWVudC5cbiAgICBsZXQgdmlzaXRlZFRhcmdldEhhc2hcbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgJiYgUmVmbGVjdC5vd25LZXlzKGtleSkuaW5jbHVkZXMoJC5hcmd1bWVudCkpIHtcbiAgICAgIGxldCBhcmd1bWVudCA9IGtleVxuICAgICAgOyh7IHZpc2l0ZWRUYXJnZXRIYXNoLCBrZXkgfSA9IGFyZ3VtZW50KVxuICAgIH1cblxuICAgIGlmIChSZWZsZWN0Lm93bktleXModGFyZ2V0KS5pbmNsdWRlcyhrZXkpKSByZXR1cm4gdHJ1ZSAvLyBjaGVjayB0aGUgdGFyZ2V0IG9mIHByb3h5IGZvciBrZXlzLCBwcm92aWRpbmcgYWNjZXNzIHRvIHRoZW0uXG5cbiAgICB2aXNpdGVkVGFyZ2V0SGFzaCB8fD0gbmV3IFNldCgpIC8vIGZvbGxvdyB2aXNpdGVkIHRhcmdldHMgdGhhdCBhcmUgb2YgdHlwZSBtdWx0aXBsZSBkZWxlZ2F0aW9uIGNsYXNzXG4gICAgaWYgKHZpc2l0ZWRUYXJnZXRIYXNoLmhhcyh0YXJnZXQpKSByZXR1cm4gZmFsc2UgLy8gaWYgYWxyZWFkeSB2aXNpdGVkIHRoZW4gdGhlIHByb3BlcnR5IHdhcyBub3QgZm91bmQgb24gaXQuXG4gICAgdmlzaXRlZFRhcmdldEhhc2guYWRkKHRhcmdldClcblxuICAgIHJldHVybiB0YXJnZXRbJC5saXN0XS5zb21lKG9iamVjdCA9PiB7XG4gICAgICAvLyBwcmV2ZW50IGFkZGl0aW9uYWwgY2FsbHMgd2hlbiBwb3NzaWJsZS5cbiAgICAgIGlmIChvYmplY3QgIT09IHRhcmdldClcbiAgICAgICAgcmV0dXJuIFJlZmxlY3QuaGFzKG9iamVjdCwge1xuICAgICAgICAgIFskLmFyZ3VtZW50XTogdHJ1ZSAvKiogbWFyayBvYmplY3QgYXMgaG9sZGluZyBhZGRpdGlvbmFsIGFyZ3VtZW50cyAqLyxcbiAgICAgICAgICB2aXNpdGVkVGFyZ2V0SGFzaCxcbiAgICAgICAgICBrZXksXG4gICAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICAvKlxuICAgIFRoZSBnZXQgdHJhcCBpcyBhIHRyYXAgZm9yIGdldHRpbmcgcHJvcGVydHkgdmFsdWVzLiBJIHVzZSBmaW5kIHRvIGZpbmQgdGhlIGZpcnN0IHByb3RvdHlwZSB3aGljaCBjb250YWlucyB0aGF0IHByb3BlcnR5LCBhbmQgSSByZXR1cm4gdGhlIHZhbHVlLCBcbiAgICBvciBjYWxsIHRoZSBnZXR0ZXIgb24gdGhlIGFwcHJvcHJpYXRlIHJlY2VpdmVyLiBUaGlzIGlzIGhhbmRsZWQgYnkgUmVmbGVjdC5nZXQuIElmIG5vIHByb3RvdHlwZSBjb250YWlucyB0aGUgcHJvcGVydHksIEkgcmV0dXJuIHVuZGVmaW5lZC5cbiAgKi9cbiAgZ2V0KHRhcmdldCwga2V5LCByZWNlaXZlciAvKnJlY2VpdmVyIHByb3h5IG9mIHRhcmdldCwgdXNlZCBhbHNvIGFzIGFkZGl0aW9uYWwgYXJndW1lbnQqLykge1xuICAgIGlmIChrZXkgPT0gJ19fcHJvdG9fXycpIHJldHVybiBSZWZsZWN0LmdldFByb3RvdHlwZU9mKHJlY2VpdmVyIC8qKiBpbiB0aGlzIGNhc2UgaXQgbWF5IGluZGljYXRlIGFsc28gYSBzdWJpbnN0YW5jZSBvZiBwcm94eSAqLykgLy8gc3BlY2lhbCB1c2UgY2FzZXMgLSBfX3Byb3RvX18gcHJvcGVydHlcbiAgICBpZiAoa2V5IGluIHRhcmdldCkgcmV0dXJuIHRhcmdldFtrZXldIC8vIGFsbG93IGFjY2VzcyB0byB0YXJnZXQncyBNdWx0aXBsZURlbGVnYXRpb24gRnVuY3Rpb25hbGl0aWVzIHRvIGdldCB0aGUgbGlzdCBvZiBkZWxnYXRpb25zLlxuXG4gICAgbGV0IHZpc2l0ZWRUYXJnZXRIYXNoIC8vIGNoZWNrIGlmIHRoZSBhcmd1bWVudCBob2xkcyBhZGRpdGlvbmFsIGFyZ3VtZW50cyBmcm9tIHByZXZpb3VzIGltcGxlbWVudGF0aW9uIG9yIG9ubHkgdGhlIG5hdGl2ZSBgdGFyZ2V0YCBhcmd1bWVudC5cbiAgICBpZiAodHlwZW9mIHJlY2VpdmVyID09PSAnb2JqZWN0JyAmJiBSZWZsZWN0Lm93bktleXMocmVjZWl2ZXIpLmluY2x1ZGVzKCQuYXJndW1lbnQpKSB7XG4gICAgICBsZXQgYXJndW1lbnQgPSByZWNlaXZlclxuICAgICAgOyh7IHZpc2l0ZWRUYXJnZXRIYXNoLCByZWNlaXZlciB9ID0gYXJndW1lbnQpXG4gICAgfVxuXG4gICAgdmlzaXRlZFRhcmdldEhhc2ggfHw9IG5ldyBTZXQoKSAvLyBmb2xsb3cgdmlzaXRlZCB0YXJnZXRzIHRoYXQgYXJlIG9mIHR5cGUgbXVsdGlwbGUgZGVsZWdhdGlvbiBjbGFzc1xuICAgIGlmICh2aXNpdGVkVGFyZ2V0SGFzaC5oYXModGFyZ2V0KSkgcmV0dXJuIGZhbHNlIC8vIGlmIGFscmVhZHkgdmlzaXRlZCB0aGVuIHRoZSBwcm9wZXJ0eSB3YXMgbm90IGZvdW5kIG9uIGl0LlxuICAgIHZpc2l0ZWRUYXJnZXRIYXNoLmFkZCh0YXJnZXQpXG4gICAgaWYgKHJlY2VpdmVyKSB2aXNpdGVkVGFyZ2V0SGFzaC5hZGQocmVjZWl2ZXIpXG5cbiAgICAvLyBmaW5kIHRoZSBvYmplY3QgdGhhdCBoYXMgdGhlIHByb3BlcnR5IChvd24ga2V5IG9yIGluIHByb3RvdHlwZSBjaGFpbilcbiAgICBsZXQgdmFsdWVcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGFyZ2V0WyQubGlzdF0ubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBsZXQgb2JqZWN0ID0gdGFyZ2V0WyQubGlzdF1baW5kZXhdXG4gICAgICBpZiAodmlzaXRlZFRhcmdldEhhc2guaGFzKG9iamVjdCkpIGNvbnRpbnVlIC8vIHByZXZlbnQgY2lyY3VsYXIgY2FsbHNcbiAgICAgIGlmIChcbiAgICAgICAgUmVmbGVjdC5oYXMob2JqZWN0LCB7XG4gICAgICAgICAgWyQuYXJndW1lbnRdOiB0cnVlIC8qKiBtYXJrIG9iamVjdCBhcyBob2xkaW5nIGFkZGl0aW9uYWwgYXJndW1lbnRzICovLFxuICAgICAgICAgIHZpc2l0ZWRUYXJnZXRIYXNoOiBuZXcgU2V0KFtyZWNlaXZlcl0pLCAvLyBhc3NpZ24gcHJvdG90eXBlcyB0byBza2lwIHZpc2l0aW5nXG4gICAgICAgICAga2V5LFxuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgICB2YWx1ZSA9IFJlZmxlY3QuZ2V0KG9iamVjdCwga2V5LCB7XG4gICAgICAgICAgWyQuYXJndW1lbnRdOiB0cnVlIC8qKiBtYXJrIG9iamVjdCBhcyBob2xkaW5nIGFkZGl0aW9uYWwgYXJndW1lbnRzICovLFxuICAgICAgICAgIHZpc2l0ZWRUYXJnZXRIYXNoLFxuICAgICAgICAgIHJlY2VpdmVyLFxuICAgICAgICB9KVxuXG4gICAgICB2aXNpdGVkVGFyZ2V0SGFzaC5hZGQob2JqZWN0KVxuXG4gICAgICBpZiAodmFsdWUpIHJldHVybiB2YWx1ZVxuICAgIH1cblxuICAgIHJldHVybiB2b2lkIDAgLy8gYmVjYXVzZSBgdW5kZWZpbmVkYCBpcyBhIGdsb2JhbCB2YXJpYWJsZSBhbmQgbm90IGEgcmVzZXJ2ZWQgd29yZCBpbiBKUy4gdm9pZCBzaW1wbHkgaW5zdXJlcyB0aGUgcmV0dXJuIG9mIHVuZGVmaW5lZC5cbiAgfSxcblxuICAvKiBcbiAgICBUaGUgc2V0IHRyYXAgaXMgYSB0cmFwIGZvciBzZXR0aW5nIHByb3BlcnR5IHZhbHVlcy4gXG4gICAgSSB1c2UgZmluZCB0byBmaW5kIHRoZSBmaXJzdCBwcm90b3R5cGUgd2hpY2ggY29udGFpbnMgdGhhdCBwcm9wZXJ0eSwgYW5kIEkgY2FsbCBpdHMgc2V0dGVyIG9uIHRoZSBhcHByb3ByaWF0ZSByZWNlaXZlci4gXG4gICAgSWYgdGhlcmUgaXMgbm8gc2V0dGVyIG9yIG5vIHByb3RvdHlwZSBjb250YWlucyB0aGUgcHJvcGVydHksIHRoZSB2YWx1ZSBpcyBkZWZpbmVkIG9uIHRoZSBhcHByb3ByaWF0ZSByZWNlaXZlci4gVGhpcyBpcyBoYW5kbGVkIGJ5IFJlZmxlY3Quc2V0LlxuICAqL1xuICBzZXQodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWUsIHJlY2VpdmVyKSB7XG4gICAgLy8gZmluZCB0aGUgcHJvdG90eXBlIGNvbnRhaW5pbmcgdGhlIHByb3BlcnR5XG4gICAgbGV0IGZvdW5kT2JqZWN0ID0gdGFyZ2V0WyQubGlzdF0uZmluZChvYmplY3QgPT4gcHJvcGVydHkgaW4gb2JqZWN0KVxuICAgIGlmIChmb3VuZE9iamVjdCkgUmVmbGVjdC5zZXQoZm91bmRPYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgcmVjZWl2ZXIpXG5cbiAgICAvLyBvdGhlcndpc2Ugc2V0IG9uIHRoZSB0YXJnZXQgb2YgdGhlIHByb3h5IChyYXRoZXIgdGhhbiBvbiBvbmUgb2YgdGhlIHByb3RvdHlwZXMpLlxuICAgIHJldHVybiBSZWZsZWN0LnNldCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSwgcmVjZWl2ZXIpXG4gIH0sXG5cbiAgLy8gZGVmaW5lIHByb3BlcnR5IG9uIHRhcmdldCBvZiBwcm94eVxuICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICAgIHJldHVybiBSZWZsZWN0LmRlZmluZVByb3BlcnR5KC4uLmFyZ3VtZW50cylcbiAgfSxcblxuICAvLyBUaGUgcHJldmVudEV4dGVuc2lvbnMgYW5kIGRlZmluZVByb3BlcnR5IHRyYXBzIGFyZSBvbmx5IGluY2x1ZGVkIHRvIHByZXZlbnQgdGhlc2Ugb3BlcmF0aW9ucyBmcm9tIG1vZGlmeWluZyB0aGUgcHJveHkgdGFyZ2V0LiBPdGhlcndpc2Ugd2UgY291bGQgZW5kIHVwIGJyZWFraW5nIHNvbWUgcHJveHkgaW52YXJpYW50cy5cbiAgcHJldmVudEV4dGVuc2lvbnM6IHRhcmdldCA9PiBmYWxzZSxcbn1cbiJdfQ==