# multiplePrototypeChain
This module aims to achieve **multiple delegation** of objects, where an object delegates to multiple other prototype chains that could be unrelated to each other. 

- Preserves access to & integrates with the JS native prototype delegation mechanism. Uses JS Proxy to define custom behavior for fundamental operations using.
- Runtime branching during delegated object lookup - Changes of parent prototypes reflects on the delegating object instance.
- Provides also utility functions to manipulate the native prototype chain of an object (e.g. pushing an object to the prototype chain). 


## Multiple inheritance approaches:

_Multiple delegation is one approach for multiple inheritance._

Acheiving **multiple inheritance** includes many different approaches, with some tweaks they could adapt to different needs (e.g. contructors could be adjusted to created objects with custom delegation): 
- Concatenation - where an object extends other objects by recursively adding properties to it. e.g. using `Object.assign`.
- Pushing objects to the single native prototype chain - where the prototype chain will grow vertically on each object addition to the chain. e.g. modifying the target object prototype pointer (setPrototypeOf/.__proto__) to an object and appending the original delegation to the new parent object.
- Lookup behavior modification - overriding the property lookup algorithm to include additional objects and their parents recusevily. e.g. using Proxy to interacte with instance objects, where the proxy will include custom lookup mechanism, and provides runtime branching for multiple delegations.
- etc.
___

[Todo list](/documentation/TODO.md)

___

### 🔑 License: [MIT](/.github/LICENSE)
