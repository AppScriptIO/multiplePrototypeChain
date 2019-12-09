"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.inheritsMultipleConstructors = inheritsMultipleConstructors;exports.inheritsMultiple = inheritsMultiple;
function inheritsMultipleConstructors({ BaseCtor, SuperCtors }) {
  return new Proxy(BaseCtor, {
    construct(_, [baseArgs = [], superArgs = []], newTarget) {
      let instance = {};

      instance = SuperCtors.reduce((acc, Ctor, i) => {
        const args = superArgs[i] || [];
        return Object.assign(acc, new Ctor(...args));
      }, instance);

      instance = Object.assign(instance, new BaseCtor(...baseArgs));

      Object.setPrototypeOf(instance, BaseCtor.prototype);
      return instance;
    } });

}


function inheritsMultiple({ BaseCtor, SuperCtors }) {
  delegateToMultipleObject({
    targetObject: BaseCtor.prototype,
    delegationList: SuperCtors.map(Ctor => Ctor.prototype) });


  return inheritsMultipleConstructors({ BaseCtor, SuperCtors });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9jb25zdHJ1Y3RvckluaGVyaXRhbmNlLmpzIl0sIm5hbWVzIjpbImluaGVyaXRzTXVsdGlwbGVDb25zdHJ1Y3RvcnMiLCJCYXNlQ3RvciIsIlN1cGVyQ3RvcnMiLCJQcm94eSIsImNvbnN0cnVjdCIsIl8iLCJiYXNlQXJncyIsInN1cGVyQXJncyIsIm5ld1RhcmdldCIsImluc3RhbmNlIiwicmVkdWNlIiwiYWNjIiwiQ3RvciIsImkiLCJhcmdzIiwiT2JqZWN0IiwiYXNzaWduIiwic2V0UHJvdG90eXBlT2YiLCJwcm90b3R5cGUiLCJpbmhlcml0c011bHRpcGxlIiwiZGVsZWdhdGVUb011bHRpcGxlT2JqZWN0IiwidGFyZ2V0T2JqZWN0IiwiZGVsZWdhdGlvbkxpc3QiLCJtYXAiXSwibWFwcGluZ3MiOiI7QUFDTyxTQUFTQSw0QkFBVCxDQUFzQyxFQUFFQyxRQUFGLEVBQVlDLFVBQVosRUFBdEMsRUFBZ0U7QUFDckUsU0FBTyxJQUFJQyxLQUFKLENBQVVGLFFBQVYsRUFBb0I7QUFDekJHLElBQUFBLFNBQVMsQ0FBQ0MsQ0FBRCxFQUFJLENBQUNDLFFBQVEsR0FBRyxFQUFaLEVBQWdCQyxTQUFTLEdBQUcsRUFBNUIsQ0FBSixFQUFxQ0MsU0FBckMsRUFBZ0Q7QUFDdkQsVUFBSUMsUUFBUSxHQUFHLEVBQWY7O0FBRUFBLE1BQUFBLFFBQVEsR0FBR1AsVUFBVSxDQUFDUSxNQUFYLENBQWtCLENBQUNDLEdBQUQsRUFBTUMsSUFBTixFQUFZQyxDQUFaLEtBQWtCO0FBQzdDLGNBQU1DLElBQUksR0FBR1AsU0FBUyxDQUFDTSxDQUFELENBQVQsSUFBZ0IsRUFBN0I7QUFDQSxlQUFPRSxNQUFNLENBQUNDLE1BQVAsQ0FBY0wsR0FBZCxFQUFtQixJQUFJQyxJQUFKLENBQVMsR0FBR0UsSUFBWixDQUFuQixDQUFQO0FBQ0QsT0FIVSxFQUdSTCxRQUhRLENBQVg7O0FBS0FBLE1BQUFBLFFBQVEsR0FBR00sTUFBTSxDQUFDQyxNQUFQLENBQWNQLFFBQWQsRUFBd0IsSUFBSVIsUUFBSixDQUFhLEdBQUdLLFFBQWhCLENBQXhCLENBQVg7O0FBRUFTLE1BQUFBLE1BQU0sQ0FBQ0UsY0FBUCxDQUFzQlIsUUFBdEIsRUFBZ0NSLFFBQVEsQ0FBQ2lCLFNBQXpDO0FBQ0EsYUFBT1QsUUFBUDtBQUNELEtBYndCLEVBQXBCLENBQVA7O0FBZUQ7OztBQUdNLFNBQVNVLGdCQUFULENBQTBCLEVBQUVsQixRQUFGLEVBQVlDLFVBQVosRUFBMUIsRUFBb0Q7QUFDekRrQixFQUFBQSx3QkFBd0IsQ0FBQztBQUN2QkMsSUFBQUEsWUFBWSxFQUFFcEIsUUFBUSxDQUFDaUIsU0FEQTtBQUV2QkksSUFBQUEsY0FBYyxFQUFFcEIsVUFBVSxDQUFDcUIsR0FBWCxDQUFlWCxJQUFJLElBQUlBLElBQUksQ0FBQ00sU0FBNUIsQ0FGTyxFQUFELENBQXhCOzs7QUFLQSxTQUFPbEIsNEJBQTRCLENBQUMsRUFBRUMsUUFBRixFQUFZQyxVQUFaLEVBQUQsQ0FBbkM7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcGxlbWVudCBtdWx0aXBsZSBzdXBlciBjb25zdHJ1Y3RvcnMgd2l0aCBhYmlsaXR5IHRvIHBhc3MgdW5pcXVlIGFyZ3VtZW50cyBmb3IgZWFjaCBkdXJpbmcgaW5zdGFuY2UgY3JlYXRpb24uXG5leHBvcnQgZnVuY3Rpb24gaW5oZXJpdHNNdWx0aXBsZUNvbnN0cnVjdG9ycyh7IEJhc2VDdG9yLCBTdXBlckN0b3JzIH0pIHtcbiAgcmV0dXJuIG5ldyBQcm94eShCYXNlQ3Rvciwge1xuICAgIGNvbnN0cnVjdChfLCBbYmFzZUFyZ3MgPSBbXSwgc3VwZXJBcmdzID0gW11dLCBuZXdUYXJnZXQpIHtcbiAgICAgIGxldCBpbnN0YW5jZSA9IHt9XG5cbiAgICAgIGluc3RhbmNlID0gU3VwZXJDdG9ycy5yZWR1Y2UoKGFjYywgQ3RvciwgaSkgPT4ge1xuICAgICAgICBjb25zdCBhcmdzID0gc3VwZXJBcmdzW2ldIHx8IFtdXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGFjYywgbmV3IEN0b3IoLi4uYXJncykpXG4gICAgICB9LCBpbnN0YW5jZSlcblxuICAgICAgaW5zdGFuY2UgPSBPYmplY3QuYXNzaWduKGluc3RhbmNlLCBuZXcgQmFzZUN0b3IoLi4uYmFzZUFyZ3MpKVxuXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoaW5zdGFuY2UsIEJhc2VDdG9yLnByb3RvdHlwZSlcbiAgICAgIHJldHVybiBpbnN0YW5jZVxuICAgIH0sXG4gIH0pXG59XG5cbi8vIGNyZWF0ZSBkZWxlZ2F0aW9uIG9uIGNvbnN0cnVjdG9ycyAmIHByb3RvdHlwZXMuXG5leHBvcnQgZnVuY3Rpb24gaW5oZXJpdHNNdWx0aXBsZSh7IEJhc2VDdG9yLCBTdXBlckN0b3JzIH0pIHtcbiAgZGVsZWdhdGVUb011bHRpcGxlT2JqZWN0KHtcbiAgICB0YXJnZXRPYmplY3Q6IEJhc2VDdG9yLnByb3RvdHlwZSxcbiAgICBkZWxlZ2F0aW9uTGlzdDogU3VwZXJDdG9ycy5tYXAoQ3RvciA9PiBDdG9yLnByb3RvdHlwZSksXG4gIH0pXG5cbiAgcmV0dXJuIGluaGVyaXRzTXVsdGlwbGVDb25zdHJ1Y3RvcnMoeyBCYXNlQ3RvciwgU3VwZXJDdG9ycyB9KVxufVxuIl19