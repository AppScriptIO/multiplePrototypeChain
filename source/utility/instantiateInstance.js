"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.instantiateInstance = instantiateInstance;
function instantiateInstance({ type = 'object' } = {}) {
  let instance;
  switch (type) {
    case 'function':
      instance = new Function();
      break;
    case 'object':
    default:
      instance = Object.create(null);
      break;}

  return instance;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlsaXR5L2luc3RhbnRpYXRlSW5zdGFuY2UuanMiXSwibmFtZXMiOlsiaW5zdGFudGlhdGVJbnN0YW5jZSIsInR5cGUiLCJpbnN0YW5jZSIsIkZ1bmN0aW9uIiwiT2JqZWN0IiwiY3JlYXRlIl0sIm1hcHBpbmdzIjoiO0FBQ08sU0FBU0EsbUJBQVQsQ0FBNkIsRUFBRUMsSUFBSSxHQUFHLFFBQVQsS0FBc0IsRUFBbkQsRUFBdUQ7QUFDNUQsTUFBSUMsUUFBSjtBQUNBLFVBQVFELElBQVI7QUFDRSxTQUFLLFVBQUw7QUFDRUMsTUFBQUEsUUFBUSxHQUFHLElBQUlDLFFBQUosRUFBWDtBQUNBO0FBQ0YsU0FBSyxRQUFMO0FBQ0E7QUFDRUQsTUFBQUEsUUFBUSxHQUFHRSxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLENBQVg7QUFDQSxZQVBKOztBQVNBLFNBQU9ILFFBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNyZWF0aW5nIGEgbmV3IG9iamVjdCBhbmQgdXNpbmcgaXQgZm9yIHRoZSBwcm94eSBpbnN0ZWFkIG9mIHRoZSB0YXJnZXQgb2JqZWN0LCBhbGxvd3MgZm9yIHNpbXBsaWZpZWQgaW1wbGVtZW50YXRpb24gb2YgdHJhcCBmdW5jdGlvbnMuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudGlhdGVJbnN0YW5jZSh7IHR5cGUgPSAnb2JqZWN0JyB9ID0ge30pIHtcbiAgbGV0IGluc3RhbmNlXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIGluc3RhbmNlID0gbmV3IEZ1bmN0aW9uKClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICBkZWZhdWx0OlxuICAgICAgaW5zdGFuY2UgPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgICBicmVha1xuICB9XG4gIHJldHVybiBpbnN0YW5jZVxufVxuIl19