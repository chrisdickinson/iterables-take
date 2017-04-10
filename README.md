# @iterables/take

Given an iterable, return an iterable for the leading subset of elements.

```javascript
const take = require('@iterables/take')

console.log([...take([1,2,3], 1)]) // [1]

console.log([...take.until([1,2,3], xs => xs % 2 === 0)]) // [1]

console.log([...take.while([1,2,3], xs => xs !== 3)]) // [1, 2]
```

## Installation

```
$ npm install --save @iterables/take
```

## API

### `take(iterable, n = Infinity) -> Iterator<T>`

Lazily take the first `n` elements of `iterable`, where `n` is an integer
defaulting to `Infinity`. The returned iterator is exhausted when `n` is
reached or when `iterable` is exhausted.

### `take.while(iterable, test) -> Iterator<T>`

Lazily take the first `n` elements of `iterable` while `test` returns `true`.
`test` should be a function taking `xs`, `idx`, and `all` and returning
`Boolean`. `xs` will be an element of the iterable, `idx` will be the index,
and `all` will be the original iterable argument. The returned iterator is
exhausted when `test` returns false, or when `iterable` is exhausted.

### `take.until(iterable, test) -> Iterator<T>`

Lazily take the first `n` elements of `iterable` while `test` returns `false`.
`test` should be a function taking `xs`, `idx`, and `all` and returning
`Boolean`. `xs` will be an element of the iterable, `idx` will be the index,
and `all` will be the original iterable argument. The returned iterator is
exhausted when `test` returns true, or when `iterable` is exhausted.

## License

MIT
