'use strict'

const tap = require('tap')

const take = require('./iterables-take')

function test (name, testCase) {
  return tap.test(name, assert => {
    testCase(assert)
    return Promise.resolve()
  })
}

test('fails if falsey iterable given', assert => {
  assert.throws(TypeError, () => {
    return [...take(null)]
  })
  assert.throws(TypeError, () => {
    return [...take(false)]
  })
  assert.throws(TypeError, () => {
    return [...take(0)]
  })
})

test('fails if iterable is not iterable', assert => {
  assert.throws(TypeError, () => {
    return [...take({[Symbol.iterator]: null})]
  })
})

test('fails if n is nan', assert => {
  assert.throws(TypeError, () => {
    return [...take([1, 2], 'banana')]
  })

  assert.throws(TypeError, () => {
    return [...take([1, 2], {})]
  })
})

test('n defaults to Infinity', assert => {
  assert.deepEqual([...take([1, 2, 3, 4])], [
    1,
    2,
    3,
    4
  ])
})

test('takes first n items', assert => {
  assert.deepEqual([...take([1, 2, 3, 4], 2)], [
    1,
    2
  ])
})

test('fails if falsey iterable given', assert => {
  assert.throws(TypeError, () => {
    return [...take.until(null)]
  })
  assert.throws(TypeError, () => {
    return [...take.until(false)]
  })
  assert.throws(TypeError, () => {
    return [...take.until(0)]
  })
})

test('fails if iterable is not iterable', assert => {
  assert.throws(TypeError, () => {
    return [...take.until({[Symbol.iterator]: null})]
  })
})

test('fails if test is not a function', assert => {
  assert.throws(TypeError, () => {
    return [...take.until([1, 2], 'banana')]
  })

  assert.throws(TypeError, () => {
    return [...take.until([1, 2], {})]
  })
})

test('takes until test passes', assert => {
  assert.deepEqual([...take.until([0, false, null, 1], Boolean)], [
    0,
    false,
    null
  ])
})

test('takes until iterable runs out of items', assert => {
  assert.deepEqual([...take.until([0, false, null], Boolean)], [
    0,
    false,
    null
  ])
})

test('fails if falsey iterable given', assert => {
  assert.throws(TypeError, () => {
    return [...take.while(null)]
  })
  assert.throws(TypeError, () => {
    return [...take.while(false)]
  })
  assert.throws(TypeError, () => {
    return [...take.while(0)]
  })
})

test('fails if iterable is not iterable', assert => {
  assert.throws(TypeError, () => {
    return [...take.while({[Symbol.iterator]: null})]
  })
})

test('fails if test is not a function', assert => {
  assert.throws(TypeError, () => {
    return [...take.while([1, 2], 'banana')]
  })

  assert.throws(TypeError, () => {
    return [...take.while([1, 2], {})]
  })
})

test('takes while test passes', assert => {
  assert.deepEqual([...take.while(['banana', 1, true, 0], Boolean)], [
    'banana',
    1,
    true
  ])
})

test('takes while iterable has items', assert => {
  assert.deepEqual([...take.while(['banana', 1, true], Boolean)], [
    'banana',
    1,
    true
  ])
})
