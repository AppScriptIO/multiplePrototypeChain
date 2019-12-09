"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.MultipleDelegation = void 0;var _interceptHandler = require("./interceptHandler.js");
var _reference = require("./reference.js");let _Symbol$hasInstance, _$$setter;_Symbol$hasInstance =













Symbol.hasInstance;_$$setter =







_reference.$.setter;class MultipleDelegation {static [_Symbol$hasInstance](instance) {if (instance && typeof instance == 'object' && Boolean(Reflect.ownKeys(instance).includes(_reference.$.target))) {return Object.getPrototypeOf(instance[_reference.$.target]) === this.prototype;}}[_$$setter](prototype) {
    if (!Array.isArray(prototype)) prototype = [prototype];
    let prototypeList = [...this[_reference.$.list], ...prototype];
    this[_reference.$.list] = [...new Set(prototypeList)];
  }

  constructor(delegationList = []) {

    let target = this;

    target[_reference.$.list] = [];
    target[_reference.$.setter](delegationList);
    target[_reference.$.target] = target;
    let proxy = new Proxy(target, MultipleDelegation.proxyHandler);

    target[_reference.$.metadata] = {
      type: 'Multiple delegation proxy',
      get delegationList() {
        return target[_reference.$.list];
      } };

    return { proxy, target };
  }


  static addDelegation({ targetObject, delegationList = [] }) {var _targetObject, _targetObject2;
    if (delegationList.length == 0) return;

    let currentPrototype = (_targetObject = targetObject, Object.getPrototypeOf(_targetObject));
    delegationList.unshift(currentPrototype);

    if (!(currentPrototype instanceof MultipleDelegation)) {
      let { proxy } = new MultipleDelegation();

      Object.setPrototypeOf(targetObject, proxy);
    }

    let multipleDelegationProxy = (_targetObject2 = targetObject, Object.getPrototypeOf(_targetObject2));
    delegationList = delegationList.filter(item => item && item !== multipleDelegationProxy);
    multipleDelegationProxy[_reference.$.target][_reference.$.setter](delegationList);
  }}exports.MultipleDelegation = MultipleDelegation;MultipleDelegation.proxyHandler = _interceptHandler.proxyHandler;MultipleDelegation.


debugging = {

  get keyUsedOnTargetInstance() {
    let { target } = new MultipleDelegation();
    return Reflect.ownKeys(target);
  } };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9wcm94eVRyYXBBcHByb2FjaC9NdWx0aXBsZURlbGVnYXRpb24uY2xhc3MuanMiXSwibmFtZXMiOlsiU3ltYm9sIiwiaGFzSW5zdGFuY2UiLCIkIiwic2V0dGVyIiwiTXVsdGlwbGVEZWxlZ2F0aW9uIiwiaW5zdGFuY2UiLCJCb29sZWFuIiwiUmVmbGVjdCIsIm93bktleXMiLCJpbmNsdWRlcyIsInRhcmdldCIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwicHJvdG90eXBlIiwiQXJyYXkiLCJpc0FycmF5IiwicHJvdG90eXBlTGlzdCIsImxpc3QiLCJTZXQiLCJjb25zdHJ1Y3RvciIsImRlbGVnYXRpb25MaXN0IiwicHJveHkiLCJQcm94eSIsInByb3h5SGFuZGxlciIsIm1ldGFkYXRhIiwidHlwZSIsImFkZERlbGVnYXRpb24iLCJ0YXJnZXRPYmplY3QiLCJsZW5ndGgiLCJjdXJyZW50UHJvdG90eXBlIiwidW5zaGlmdCIsInNldFByb3RvdHlwZU9mIiwibXVsdGlwbGVEZWxlZ2F0aW9uUHJveHkiLCJmaWx0ZXIiLCJpdGVtIiwiZGVidWdnaW5nIiwia2V5VXNlZE9uVGFyZ2V0SW5zdGFuY2UiXSwibWFwcGluZ3MiOiIrR0FBQTtBQUNBLDJDOzs7Ozs7Ozs7Ozs7OztBQWNVQSxNQUFNLENBQUNDLFc7Ozs7Ozs7O0FBUWRDLGFBQUVDLE0sQ0FwQkUsTUFBTUMsa0JBQU4sQ0FBeUIsQ0FZOUIsNkJBQTRCQyxRQUE1QixFQUFzQyxDQUNwQyxJQUFJQSxRQUFRLElBQStCLE9BQU9BLFFBQVAsSUFBbUIsUUFBMUQsSUFBc0VDLE9BQU8sQ0FBQ0MsT0FBTyxDQUFDQyxPQUFSLENBQWdCSCxRQUFoQixFQUEwQkksUUFBMUIsQ0FBbUNQLGFBQUVRLE1BQXJDLENBQUQsQ0FBakYsRUFBaUksQ0FDL0gsT0FBT0MsTUFBTSxDQUFDQyxjQUFQLENBQXNCUCxRQUFRLENBQUNILGFBQUVRLE1BQUgsQ0FBOUIsTUFBOEMsS0FBS0csU0FBMUQsQ0FDRCxDQUNGLENBSUQsWUFBV0EsU0FBWCxFQUFzQjtBQUNwQixRQUFJLENBQUNDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixTQUFkLENBQUwsRUFBK0JBLFNBQVMsR0FBRyxDQUFDQSxTQUFELENBQVo7QUFDL0IsUUFBSUcsYUFBYSxHQUFHLENBQUMsR0FBRyxLQUFLZCxhQUFFZSxJQUFQLENBQUosRUFBa0IsR0FBR0osU0FBckIsQ0FBcEI7QUFDQSxTQUFLWCxhQUFFZSxJQUFQLElBQWUsQ0FBQyxHQUFHLElBQUlDLEdBQUosQ0FBUUYsYUFBUixDQUFKLENBQWY7QUFDRDs7QUFFREcsRUFBQUEsV0FBVyxDQUFDQyxjQUFjLEdBQUcsRUFBbEIsRUFBc0I7O0FBRS9CLFFBQUlWLE1BQU0sR0FBRyxJQUFiOztBQUVBQSxJQUFBQSxNQUFNLENBQUNSLGFBQUVlLElBQUgsQ0FBTixHQUFpQixFQUFqQjtBQUNBUCxJQUFBQSxNQUFNLENBQUNSLGFBQUVDLE1BQUgsQ0FBTixDQUFpQmlCLGNBQWpCO0FBQ0FWLElBQUFBLE1BQU0sQ0FBQ1IsYUFBRVEsTUFBSCxDQUFOLEdBQW1CQSxNQUFuQjtBQUNBLFFBQUlXLEtBQUssR0FBRyxJQUFJQyxLQUFKLENBQVVaLE1BQVYsRUFBa0JOLGtCQUFrQixDQUFDbUIsWUFBckMsQ0FBWjs7QUFFQWIsSUFBQUEsTUFBTSxDQUFDUixhQUFFc0IsUUFBSCxDQUFOLEdBQXFCO0FBQ25CQyxNQUFBQSxJQUFJLEVBQUUsMkJBRGE7QUFFbkIsVUFBSUwsY0FBSixHQUFxQjtBQUNuQixlQUFPVixNQUFNLENBQUNSLGFBQUVlLElBQUgsQ0FBYjtBQUNELE9BSmtCLEVBQXJCOztBQU1BLFdBQU8sRUFBRUksS0FBRixFQUFTWCxNQUFULEVBQVA7QUFDRDs7O0FBR0QsU0FBT2dCLGFBQVAsQ0FBcUIsRUFBRUMsWUFBRixFQUFnQlAsY0FBYyxHQUFHLEVBQWpDLEVBQXJCLEVBQTREO0FBQzFELFFBQUlBLGNBQWMsQ0FBQ1EsTUFBZixJQUF5QixDQUE3QixFQUFnQzs7QUFFaEMsUUFBSUMsZ0JBQWdCLG9CQUFHRixZQUFILEVBQW1CaEIsTUFBTSxDQUFDQyxjQUExQixnQkFBcEI7QUFDQVEsSUFBQUEsY0FBYyxDQUFDVSxPQUFmLENBQXVCRCxnQkFBdkI7O0FBRUEsUUFBSSxFQUFFQSxnQkFBZ0IsWUFBWXpCLGtCQUE5QixDQUFKLEVBQXVEO0FBQ3JELFVBQUksRUFBRWlCLEtBQUYsS0FBWSxJQUFJakIsa0JBQUosRUFBaEI7O0FBRUFPLE1BQUFBLE1BQU0sQ0FBQ29CLGNBQVAsQ0FBc0JKLFlBQXRCLEVBQW9DTixLQUFwQztBQUNEOztBQUVELFFBQUlXLHVCQUF1QixxQkFBR0wsWUFBSCxFQUFtQmhCLE1BQU0sQ0FBQ0MsY0FBMUIsaUJBQTNCO0FBQ0FRLElBQUFBLGNBQWMsR0FBR0EsY0FBYyxDQUFDYSxNQUFmLENBQXNCQyxJQUFJLElBQUlBLElBQUksSUFBSUEsSUFBSSxLQUFLRix1QkFBL0MsQ0FBakI7QUFDQUEsSUFBQUEsdUJBQXVCLENBQUM5QixhQUFFUSxNQUFILENBQXZCLENBQWtDUixhQUFFQyxNQUFwQyxFQUE0Q2lCLGNBQTVDO0FBQ0QsR0E1RDZCLEMsZ0RBQW5CaEIsa0IsQ0FPSm1CLFksR0FBZUEsOEIsQ0FQWG5CLGtCOzs7QUErREorQixTLEdBQVk7O0FBRWpCLE1BQUlDLHVCQUFKLEdBQThCO0FBQzVCLFFBQUksRUFBRTFCLE1BQUYsS0FBYSxJQUFJTixrQkFBSixFQUFqQjtBQUNBLFdBQU9HLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQkUsTUFBaEIsQ0FBUDtBQUNELEdBTGdCLEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm94eUhhbmRsZXIgfSBmcm9tICcuL2ludGVyY2VwdEhhbmRsZXIuanMnXG5pbXBvcnQgeyAkIH0gZnJvbSAnLi9yZWZlcmVuY2UuanMnXG5cbmV4cG9ydCBjbGFzcyBNdWx0aXBsZURlbGVnYXRpb24ge1xuICAvKiAgICAgXG4gIFRoZXJlIGFyZSBtb3JlIHRyYXBzIGF2YWlsYWJsZSwgd2hpY2ggYXJlIG5vdCB1c2VkXG4gIFRoZSBkZWxldGVQcm9wZXJ0eSB0cmFwIGlzIGEgdHJhcCBmb3IgZGVsZXRpbmcgb3duIHByb3BlcnRpZXMuIFRoZSBwcm94eSByZXByZXNlbnRzIHRoZSBpbmhlcml0YW5jZSwgc28gdGhpcyB3b3VsZG4ndCBtYWtlIG11Y2ggc2Vuc2UuIEkgbGV0IGl0IGF0dGVtcHQgdGhlIGRlbGV0aW9uIG9uIHRoZSB0YXJnZXQsIHdoaWNoIHNob3VsZCBoYXZlIG5vIHByb3BlcnR5IGFueXdheS5cbiAgVGhlIGlzRXh0ZW5zaWJsZSB0cmFwIGlzIGEgdHJhcCBmb3IgZ2V0dGluZyB0aGUgZXh0ZW5zaWJpbGl0eS4gTm90IG11Y2ggdXNlZnVsLCBnaXZlbiB0aGF0IGFuIGludmFyaWFudCBmb3JjZXMgaXQgdG8gcmV0dXJuIHRoZSBzYW1lIGV4dGVuc2liaWxpdHkgYXMgdGhlIHRhcmdldC4gU28gSSBqdXN0IGxldCBpdCByZWRpcmVjdCB0aGUgb3BlcmF0aW9uIHRvIHRoZSB0YXJnZXQsIHdoaWNoIHdpbGwgYmUgZXh0ZW5zaWJsZS5cbiAgVGhlIGFwcGx5IGFuZCBjb25zdHJ1Y3QgdHJhcHMgYXJlIHRyYXBzIGZvciBjYWxsaW5nIG9yIGluc3RhbnRpYXRpbmcuIFRoZXkgYXJlIG9ubHkgdXNlZnVsIHdoZW4gdGhlIHRhcmdldCBpcyBhIGZ1bmN0aW9uIG9yIGEgY29uc3RydWN0b3IuXG4gICovXG4gIHN0YXRpYyBwcm94eUhhbmRsZXIgPSBwcm94eUhhbmRsZXJcblxuICAvKiogVHJhcCBgaW5zdGFuY2VvZmAgLSBjaGVjayBpZiBpbnN0YW5jZSBpcyBvZiBNdWx0aXBsZURlbGVnYXRpb25cbiAgICogTm90ZTogdGhpcyBpbXBsZW1lbmF0aW9uIG9mIHRyYXAgcmVkZWZpbmVzIHRoZSBwdXJwb3NlIG9mIGBpbnN0YW5jZW9mYCB0byBjaGVjayBmb3IgYSBkaXJlY3QvaW1tZWRpYXRlIGluc3RhbmNlcyBvbmx5LlxuICAgKi9cbiAgc3RhdGljIFtTeW1ib2wuaGFzSW5zdGFuY2VdKGluc3RhbmNlKSB7XG4gICAgaWYgKGluc3RhbmNlIC8qKmlmIG5vdCBudWxsL3VuZGVmaW5lZCovICYmIHR5cGVvZiBpbnN0YW5jZSA9PSAnb2JqZWN0JyAmJiBCb29sZWFuKFJlZmxlY3Qub3duS2V5cyhpbnN0YW5jZSkuaW5jbHVkZXMoJC50YXJnZXQpKSkge1xuICAgICAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihpbnN0YW5jZVskLnRhcmdldF0pID09PSB0aGlzLnByb3RvdHlwZSAvLyBnZXQgcHJvdG90eXBlIG9mIHRoZSBhY3R1YWwgdGFyZ2V0IG5vdCB0aGUgcHJveHkgd3JhcHBpbmcgaXQuXG4gICAgfVxuICB9XG5cbiAgLy8gc2V0IHByb3RvdHlwZVxuICAvLyBOb3RlOiAndGhpcycgc2hvdWxkIGJlIHRoZSBvcmlnaW5hbCB0YXJnZXQgbm90IHRoZSBwcm94eSBhcm91bmQgaXQuXG4gIFskLnNldHRlcl0ocHJvdG90eXBlKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3RvdHlwZSkpIHByb3RvdHlwZSA9IFtwcm90b3R5cGVdXG4gICAgbGV0IHByb3RvdHlwZUxpc3QgPSBbLi4udGhpc1skLmxpc3RdLCAuLi5wcm90b3R5cGVdIC8vIG1lcmdlIHByb3RvdHlwZSBhcnJheXNcbiAgICB0aGlzWyQubGlzdF0gPSBbLi4ubmV3IFNldChwcm90b3R5cGVMaXN0KV0gLy8gZmlsdGVyIGR1cGxpY2F0ZSBlbnRlcmllcy5cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGRlbGVnYXRpb25MaXN0ID0gW10pIHtcbiAgICAvLyB0aGlzID0gVGhlIHRhcmdldCBpcyBub3QgbWVhbnQgdG8gYmUgYWNjZXNzYWJsZSBleHRlcm5hbGx5IHRocm91Z2ggdGhlIHdyYXBwZXIgcHJveHkuXG4gICAgbGV0IHRhcmdldCA9IHRoaXNcblxuICAgIHRhcmdldFskLmxpc3RdID0gW11cbiAgICB0YXJnZXRbJC5zZXR0ZXJdKGRlbGVnYXRpb25MaXN0KSAvLyBpbml0aWFsaXplIG11bHRpcGxlIGRlbGVnYWl0b24gbGlzdCBwcm9wZXJ0eS5cbiAgICB0YXJnZXRbJC50YXJnZXRdID0gdGFyZ2V0XG4gICAgbGV0IHByb3h5ID0gbmV3IFByb3h5KHRhcmdldCwgTXVsdGlwbGVEZWxlZ2F0aW9uLnByb3h5SGFuZGxlcilcbiAgICAvLyBkZWJ1Z2dpbmcgLSB3aGVuIGNvbnNvbGUgbG9nZ2luZyBpdCB3aWxsIG1hcmsgb2JqZWN0IGFzIHByb3h5IGFuZCBpbiBpbnNwZWN0b3IgZGVidWdnaW5nIHRvby5cbiAgICB0YXJnZXRbJC5tZXRhZGF0YV0gPSB7XG4gICAgICB0eXBlOiAnTXVsdGlwbGUgZGVsZWdhdGlvbiBwcm94eScsXG4gICAgICBnZXQgZGVsZWdhdGlvbkxpc3QoKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXRbJC5saXN0XVxuICAgICAgfSxcbiAgICB9XG4gICAgcmV0dXJuIHsgcHJveHksIHRhcmdldCB9XG4gIH1cblxuICAvKiogU3VwcG9ydCBtdWx0aXBsZSBkZWxlZ2F0ZWQgcHJvdG90eXBlIHByb3BlcnR5IGxvb2t1cCwgd2hlcmUgdGhlIHRhcmdldCdzIHByb3RvdHlwZSBpcyBvdmVyd3JpdHRlbiBieSBhIHByb3h5LiAqL1xuICBzdGF0aWMgYWRkRGVsZWdhdGlvbih7IHRhcmdldE9iamVjdCwgZGVsZWdhdGlvbkxpc3QgPSBbXSB9KSB7XG4gICAgaWYgKGRlbGVnYXRpb25MaXN0Lmxlbmd0aCA9PSAwKSByZXR1cm5cblxuICAgIGxldCBjdXJyZW50UHJvdG90eXBlID0gdGFyZ2V0T2JqZWN0IHw+IE9iamVjdC5nZXRQcm90b3R5cGVPZlxuICAgIGRlbGVnYXRpb25MaXN0LnVuc2hpZnQoY3VycmVudFByb3RvdHlwZSkgLy8gTm90ZTogZHVwbGljYXRlcyBhcmUgcmVtb3ZlZCBkdXJpbmcgc3RvcmFnZSBvZiB0aGUgcHJvdG90eXBlIGFycmF5LlxuXG4gICAgaWYgKCEoY3VycmVudFByb3RvdHlwZSBpbnN0YW5jZW9mIE11bHRpcGxlRGVsZWdhdGlvbikpIHtcbiAgICAgIGxldCB7IHByb3h5IH0gPSBuZXcgTXVsdGlwbGVEZWxlZ2F0aW9uKClcbiAgICAgIC8vIERlbGVnYXRlIHRvIHByb3h5IHRoYXQgd2lsbCBoYW5kbGUgYW5kIHJlZGlyZWN0IGZ1bmRhbWVudGFsIG9wZXJhdGlvbnMgdG8gdGhlIGFwcHJvcHJpYXRlIG9iamVjdC5cbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0YXJnZXRPYmplY3QsIHByb3h5KVxuICAgIH1cblxuICAgIGxldCBtdWx0aXBsZURlbGVnYXRpb25Qcm94eSA9IHRhcmdldE9iamVjdCB8PiBPYmplY3QuZ2V0UHJvdG90eXBlT2YgLy8gaW5zdGFuY2Ugb2YgTXVsdGlwbGVEZWxlZ2F0aW9uIGNsYXNzIHRoYXQgd2lsbCBiZSB1c2VkIGFzIHRoZSBwcm90b3R5cGUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgICBkZWxlZ2F0aW9uTGlzdCA9IGRlbGVnYXRpb25MaXN0LmZpbHRlcihpdGVtID0+IGl0ZW0gJiYgaXRlbSAhPT0gbXVsdGlwbGVEZWxlZ2F0aW9uUHJveHkpIC8vIHJlbW92ZSBjaXJjdWxhciBkZWxlZ2FpdG9uIGFuZCBudWxsIHZhbHVlc1xuICAgIG11bHRpcGxlRGVsZWdhdGlvblByb3h5WyQudGFyZ2V0XVskLnNldHRlcl0oZGVsZWdhdGlvbkxpc3QpIC8vIGFkZCBkZWxlZ2F0aW9uIHByb3RvdHlwZXMgdG8gbXVsdGlwbGUgZGVsZWxnYXRpb24gcHJveHkuXG4gIH1cblxuICAvLyDwn6eqIFVzZWQgZm9yIHVuaXQgdGVzdHNcbiAgc3RhdGljIGRlYnVnZ2luZyA9IHtcbiAgICAvLyBleHRyYWN0IGtleXMgdXNlZCBpbiBNdWx0aXBsZURlbGVnYXRpb24gaW5zdGFuY2VzIChhY3R1YWwgdGFyZ2V0IG9mIHByb3h5KVxuICAgIGdldCBrZXlVc2VkT25UYXJnZXRJbnN0YW5jZSgpIHtcbiAgICAgIGxldCB7IHRhcmdldCB9ID0gbmV3IE11bHRpcGxlRGVsZWdhdGlvbigpXG4gICAgICByZXR1cm4gUmVmbGVjdC5vd25LZXlzKHRhcmdldClcbiAgICB9LFxuICB9XG59XG4iXX0=