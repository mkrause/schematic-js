
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
