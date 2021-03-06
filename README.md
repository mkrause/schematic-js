
# Schematic

A data modeling library for JavaScript. Define your data models using declarative schemas, which can then be used to perform runtime type checking.


## Usage

```js
import schematic from '@mkrause/schematic';
```

You can use schematic to define a data model (a schema) that describes the shape of all its valid instances. For example, the following model describes users with a name and a score.

```js
const User = schematic.model.construct({
    name: String,
    score: Number,
});
```

An instance of this model can be constructed using the `construct` method:

```js
const alice = User.construct({
    name: 'Alice',
    score: 42,
});

alice.get('name'); // 'Alice'
```

The `construct` method will either return a valid instance, or throw an error if the data is not valid.


## Model constructors

| Name            | Schema                                              | Example instances                         |
| --------------- | -------------                                       | -------------                             |
| model           | `schematic.model`                                   | (any valid model)                         |
| unit            | `{}`                                                | `{}`                                      |
| text            | `schematic.text` (or: `String`)                     | `"foo"`                                   |
| text (value)    | `"foo"`                                             | `"foo"`                                   |
| number          | `schematic.number` (or: `Number`)                   | `42`                                      |
| number (value)  | `42`                                                | `42`                                      |
| struct          | `{ name: String, score: Number }`                   | `{ name: "foo", score: 42 }`              |


## Documentation

* [ImmutableJS support](./docs/immutable.md)


## Development

Installation:

    $ npm install

Building:

    $ npm run build

Running tests:

    $ npm test
