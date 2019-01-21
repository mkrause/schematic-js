
# Schematic

A data modeling library for JavaScript. With support for TypeScript.


## Usage

```js
import m from '@mkrause/model-js';
```

Define your schema:

```js
const User = m.model.construct({
    name: String,
});
```

```js
const john = User.construct({
    name: 'John',
});
```


## Usage with ImmutableJS


