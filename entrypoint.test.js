import assert from 'assert'
import {MultiplePrototypeChain} from './entrypoint.js'

describe('Multiple Prototype Chain creation', () => {
    beforeEach(() => {
    })
    describe('Create new chain with proxied prototypes', () => {
        class Superclass {}
        Superclass.prototype.meta = { Class: 'Superclass'}
        class Class extends Superclass {}
        Class.prototype.meta = { Class: 'Class'}
        class Subclass extends Class {}
        Subclass.prototype.meta = { Class: 'Subclass'}
        
        let oldInstance = new Subclass()
        oldInstance.x = 'x'
        let newInstance = MultiplePrototypeChain.createUniqueProtoChain({ object: oldInstance })

        it('Get properties - Preserve properties of original instance and original prototypes', () => {
            assert.strictEqual(newInstance.x, oldInstance.x)            
            assert.strictEqual(newInstance.meta.Class, 'Subclass')   
            assert.strictEqual(newInstance.__proto__.meta.Class, 'Subclass')            
            assert.strictEqual(newInstance.__proto__.__proto__.meta.Class, 'Class')            
            assert.strictEqual(newInstance.__proto__.__proto__.__proto__.meta.Class, 'Superclass')            
        })

        it('Set properties - Should be able to set properties through the proxy', () => {
            newInstance.t = 't'
            assert.strictEqual(newInstance.t, 't')                        
            assert.strictEqual(newInstance.delegatedPrototype.t, 't')                        
        })        

        it('In operator should check in the delegatedPrototype', () => {
            newInstance.b = 'b'
            assert.strictEqual('b' in newInstance, true)                        
        })        
    
        it('create new prototypes with corresponding delegatedPrototypes values equal to original proto chain', () => {
            // Subclass
            assert.strictEqual(newInstance.__proto__.delegatedPrototype, oldInstance.__proto__)
            // Class
            assert.strictEqual(newInstance.__proto__.__proto__.delegatedPrototype, oldInstance.__proto__.__proto__)
            // Superclass
            assert.strictEqual(newInstance.__proto__.__proto__.__proto__.delegatedPrototype, oldInstance.__proto__.__proto__.__proto__)
            // Object or Function or their prototypes ...
            assert.strictEqual(newInstance.__proto__.__proto__.__proto__.__proto__, oldInstance.__proto__.__proto__.__proto__.__proto__)
            // null 
            assert.strictEqual(newInstance.__proto__.__proto__.__proto__.__proto__.__proto__, oldInstance.__proto__.__proto__.__proto__.__proto__.__proto__)
        })

    })
    describe('Insert object to prototypechain', () => {
        class Superclass {}
        Superclass.prototype.meta = { Class: 'Superclass'}
        class Class extends Superclass {}
        Class.prototype.meta = { Class: 'Class'}
        class Subclass extends Class {}
        Subclass.prototype.meta = { Class: 'Subclass'}
        
        let oldInstance = new Subclass()
        // prepare for multiplechain pattern format.

        oldInstance.__proto__ = { delegatedPrototype: Subclass.prototype }
        oldInstance.__proto__.__proto__ = { delegatedPrototype: Class.prototype }
        oldInstance.__proto__.__proto__.__proto__ = { delegatedPrototype: Superclass.prototype }
        oldInstance.__proto__.__proto__.__proto__.__proto__ = Superclass.prototype.__proto__
        
        let objectToAdd = { x: 'x' }
        let newInstance = MultiplePrototypeChain.insertObjectToPrototypeChain({
            prototypeChain: oldInstance,
            objectToAdd: objectToAdd,
            beforePrototype: Superclass.prototype
        })
        
        it('Object should be added as delegatedPrototype inside a pointerPrototype in specified place preserving previous chain prototypes', () => {
            assert.strictEqual(newInstance.__proto__.delegatedPrototype, Subclass.prototype)
            assert.strictEqual(newInstance.__proto__.__proto__.delegatedPrototype, Class.prototype)
            assert.strictEqual(newInstance.__proto__.__proto__.__proto__.delegatedPrototype, objectToAdd)
            assert.strictEqual(newInstance.__proto__.__proto__.__proto__.__proto__.delegatedPrototype, Superclass.prototype)
            assert.strictEqual(newInstance.__proto__.__proto__.__proto__.__proto__.__proto__, Superclass.prototype.__proto__)
        })
    })
        
    
})


