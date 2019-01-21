
# Schematic

A data modeling library for JavaScript. With support for TypeScript.


## Usage

```js
import schematic from '@mkrause/schematic';
```

Define your schema:

```js
const User = schematic.model.construct({
    name: String,
});
```

```js
const john = User.construct({
    name: 'John',
});
```


## ImmutableJS entities

Schematic allows you to use ImmutableJS to define custom entity models.


## Development

Installation:

    $ npm install

Building:

    $ npm run build

Running tests:

    $ npm test
