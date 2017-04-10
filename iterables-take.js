'use strict'

module.exports = Object.assign(take, {take, until, while: takeWhile})

function * take (iterable, n) {
  if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
    throw new TypeError('expected an iterable as the first argument')
  }

  const iter = iterable[Symbol.iterator]()

  if (arguments.length === 1) {
    n = Infinity
  }

  if (isNaN(n)) {
    throw new TypeError('expected a number as the second argument')
  }

  let idx = 0

  while (idx++ < n) {
    const cursor = iter.next()
    if (cursor.done) {
      break
    }
    yield cursor.value
  }
}

function * until (iterable, test) {
  if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
    throw new TypeError('expected an iterable as the first argument')
  }

  const iter = iterable[Symbol.iterator]()

  if (typeof test !== 'function') {
    throw new TypeError('expected a function as the second argument')
  }

  let idx = 0

  do {
    const cursor = iter.next()
    if (cursor.done) {
      break
    }

    if (test(cursor.value, idx++, iterable)) {
      break
    }

    yield cursor.value
  } while (1)
}

function * takeWhile (iterable, test) {
  if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
    throw new TypeError('expected an iterable as the first argument')
  }

  const iter = iterable[Symbol.iterator]()

  if (typeof test !== 'function') {
    throw new TypeError('expected a function as the second argument')
  }

  let idx = 0

  do {
    const cursor = iter.next()
    if (cursor.done) {
      break
    }

    if (!test(cursor.value, idx++, iterable)) {
      break
    }

    yield cursor.value
  } while (1)
}
