import assert from 'assert'
import { assert as chaiAssertion } from 'chai'
import util from 'util'
import path from 'path'
import filesystem from 'fs'

import { MultipleDelegation, $ } from '../../source/script.js'

suite('Multiple Prototype Chain creation', () => {
  suiteSetup(() => {})

  suite('Proxy traps tests:', () => {
    const proxyTargetKeysForMultipleDelegationInstance = [$.target, $.metadata, $.list]

    suite('instanceof', () => {
      let { proxy } = new MultipleDelegation()
      // regular item equality check of two arrays
      test('instance check returning correctly', () => assert(proxy instanceof MultipleDelegation, `• proxy should be considered an instance of MultipleDelegation"`))
      test('only immediately created objects must be considered as instances of MultipleDelegation', () =>
        assert(!(Object.create(proxy) instanceof MultipleDelegation), `• child objects of proxy must not be considered an instance of MultipleDelegation"`))
    })

    suite('getPrototypeOf trap', () => {
      const fixture = { symbol1: Symbol('symbol1'), symbol2: Symbol('symbol2'), key1: 'key1', key2: 'key2' }
      let parent1 = { [fixture.symbol1]: fixture.symbol1, [fixture.key1]: fixture.key1 }
      let parent2 = { [fixture.symbol2]: fixture.symbol2, [fixture.key2]: fixture.key2 }
      const resultFixture = [parent1, parent2]

      let { proxy } = new MultipleDelegation()
      proxy[$.target][$.setter]([parent1, parent2])

      let prototypeList = Reflect.getPrototypeOf(proxy)

      // regular item equality check of two arrays
      test('Should return an array of prototypes', () =>
        assert(prototypeList.every(item => resultFixture.includes(item)) && resultFixture.every(item => prototypeList.includes(item)), `• multiple prorotypes should be returned"`))
    })

    suite('ownKeys trap', () => {
      const fixture = { symbol1: Symbol('symbol1'), symbol2: Symbol('symbol2'), key1: 'key1', key2: 'key2' }
      let parent1 = { [fixture.symbol1]: fixture.symbol1, [fixture.key1]: fixture.key1 }
      let parent2 = { [fixture.symbol2]: fixture.symbol2, [fixture.key2]: fixture.key2 }
      const resultFixture = [...Reflect.ownKeys(Object.assign({}, parent1, parent2)), ...proxyTargetKeysForMultipleDelegationInstance]

      let { proxy } = new MultipleDelegation()
      proxy[$.target][$.setter]([parent1, parent2])

      let keyList = Reflect.ownKeys(proxy)

      // regular item equality check of two arrays
      test('Both string and symbol properties must be returned', () =>
        assert(keyList.every(item => resultFixture.includes(item)) && resultFixture.every(item => keyList.includes(item)), `• returned ownKeys must include symbols and string names"`))

      test('Circular lookup should pass', () => {
        // add circular inheritance
        proxy[$.target][$.list].unshift(proxy) // add to begging to always be looked in.
        let objectDelegatingToProxy = Object.setPrototypeOf(Object.create(null), proxy) // add circular proxy in non immediate hierarchy.
        proxy[$.target][$.list].unshift(objectDelegatingToProxy)
        let keyList = []
        keyList = Reflect.ownKeys(proxy)
        assert(keyList.every(item => resultFixture.includes(item)) && resultFixture.every(item => keyList.includes(item)), `• returned ownKeys must include symbols and string names"`)
      })
    })

    suite('getOwnPropertyDescriptor trap', () => {
      const fixture = { symbol1: Symbol('symbol1'), symbol2: Symbol('symbol2'), key1: 'key1', key2: 'key2' }
      let parent1 = { [fixture.symbol1]: fixture.symbol1, [fixture.key1]: fixture.key1 }
      let parent2 = { [fixture.symbol2]: fixture.symbol2, [fixture.key2]: fixture.key2 }
      const resultFixture = [...Reflect.ownKeys(Object.assign({}, parent1, parent2)), ...proxyTargetKeysForMultipleDelegationInstance]

      let { proxy } = new MultipleDelegation()
      proxy[$.target][$.setter]([parent1, parent2])

      let keyList = Object.getOwnPropertyDescriptors(proxy) |> Reflect.ownKeys

      // regular item equality check of two arrays
      test('symbols and string keys must be returned', () =>
        assert(keyList.every(item => resultFixture.includes(item)) && resultFixture.every(item => keyList.includes(item)), `• returned ownKeys must include symbols and string names only"`))

      test('Circular lookup should pass', () => {
        // add circular inheritance
        proxy[$.target][$.list].unshift(proxy) // add to begging to always be looked in.
        let objectDelegatingToProxy = Object.setPrototypeOf(Object.create(null), proxy) // add circular proxy in non immediate hierarchy.
        proxy[$.target][$.list].unshift(objectDelegatingToProxy)
        let keyList = Object.getOwnPropertyDescriptors(proxy) |> Reflect.ownKeys
        assert(keyList.every(item => resultFixture.includes(item)) && resultFixture.every(item => keyList.includes(item)), `• returned ownKeys must include symbols and string names"`)
      })
    })

    suite('has trap', () => {
      const fixture = { symbol1: Symbol('symbol1'), symbol2: Symbol('symbol2'), key1: 'key1', key2: 'key2' }
      let parent1 = { [fixture.symbol1]: fixture.symbol1, [fixture.key1]: fixture.key1 }
      let parent2 = { [fixture.symbol2]: fixture.symbol2, [fixture.key2]: fixture.key2 }
      const resultFixture = [...Reflect.ownKeys(Object.assign({}, parent1, parent2)), ...proxyTargetKeysForMultipleDelegationInstance]

      let { proxy } = new MultipleDelegation()
      proxy[$.target][$.setter]([parent1, parent2])

      test('Should check properties existence:', () => {
        assert(
          resultFixture.every(value => Reflect.has(proxy, value)),
          `• existing properties were not found"`,
        )
        assert(!Reflect.has(proxy, 'nonExistingKey'), `• nonexisting property check failed`)
      })

      test('Circular lookup should pass', () => {
        // add circular inheritance
        proxy[$.target][$.list].unshift(proxy) // add to begging to always be looked in.
        let objectDelegatingToProxy = Object.setPrototypeOf(Object.create(null), proxy) // add circular proxy in non immediate hierarchy.
        proxy[$.target][$.list].unshift(objectDelegatingToProxy)
        assert(
          resultFixture.every(value => Reflect.has(proxy, value)),
          `• existing properties were not found"`,
        )
        assert(!Reflect.has(proxy, 'nonExistingKey'), `• nonexisting property check failed`)
      })
    })

    // suite('get trap', () => {
    //   const fixture = { symbol1: Symbol('symbol1'), symbol2: Symbol('symbol2'), key1: 'key1', key2: 'key2' }
    //   let parent1 = { [fixture.symbol1]: fixture.symbol1, [fixture.key1]: fixture.key1 }
    //   let parent2 = { [fixture.symbol2]: fixture.symbol2, [fixture.key2]: fixture.key2 }
    //   const resultFixture = Reflect.ownKeys(Object.assign({}, parent1, parent2))

    //   let { proxy } = new MultipleDelegation()
    //   proxy[$.target][$.setter]([parent1, parent2])

    //   test('retrieve properties:', () => {
    //     assert(
    //       resultFixture.every(value => Reflect.has(proxy, value)),
    //       `• existing properties were not found"`,
    //     )
    //     assert(!Reflect.has(proxy, 'nonExistingKey'), `• nonexisting property check failed`)
    //   })

    //   test('Circular lookup should pass', () => {
    //     // add circular inheritance
    //     proxy[$.target][$.list].unshift(proxy) // add to begging to always be looked in.
    //     let objectDelegatingToProxy = Object.setPrototypeOf(Object.create(null), proxy) // add circular proxy in non immediate hierarchy.
    //     proxy[$.target][$.list].unshift(objectDelegatingToProxy)
    //     assert(
    //       resultFixture.every(value => Reflect.has(proxy, value)),
    //       `• existing properties were not found"`,
    //     )
    //     // 'nonExistingKey' in proxy
    //     assert(!Reflect.has(proxy, 'nonExistingKey'), `• nonexisting property check failed`)
    //   })
    // })
  })

  suite('Accessing property through getters (prevent infinite getter lookup)', () => {
    let instance = { label: 'instance' },
      parent = { label: 'parent', value: 'value' }

    Object.setPrototypeOf(instance, parent)
    /**
     *  1. current prototype shouldn't be added twice.
     *  2. In case duplicate prototypes are added, property lookup shouldn't cause infinite lookup errors.
     *  3. getOwnPropertyKeys should work - console.log calls getOwnPropertyKeys which caused infinite lookup loops before.
     */
    MultipleDelegation.addDelegation({ targetObject: instance, delegationList: [parent, instance /*circular delegation*/] })

    test('Ensure no infinite lookup of property in the hierarchy is being executed', () => {
      try {
        instance.nonExistingProperty // |> console.log
        instance.constructor // |> console.log
        Object.getOwnPropertyDescriptors(instance) // |> console.log
        Object.getOwnPropertyDescriptors(instance.__proto__) // |> console.log // currently will return the descriptors of the first prototype in the list (Usually MultipleDelegation class prototype)
        assert(instance.label === 'instance', `• Property lookup failed for "label"`)
        assert(instance.value === 'value', `• Property lookup failed for "value"`)
      } catch (error) {
        console.log('• Error: Getter lookup caused infinite loop.')
        throw error
      }
    })
    test('Ensure lookup in prototype list works', () => {
      assert(instance.label === 'instance', `• Property lookup failed for "label"`)
      assert(instance.value === 'value', `• Property lookup failed for "value"`)
    })
  })
})
