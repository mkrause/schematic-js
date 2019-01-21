
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

```js
import schematic, { Immutable } from '@mkrause/schematic';

class User extends Immutable.Entity {
    static schema = {
        name: String,
    };
}

// Invalid! Throws a TypeError
const invalidUser = User.construct({
    name: null,
});

// Valid, returns a new user instance
const alice = User.construct({
    name: 'Alice',
});
```


## Development

Installation:

    $ npm install

Building:

    $ npm run build

Running tests:

    $ npm test
