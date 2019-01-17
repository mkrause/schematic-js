
import m from '../lib-cjs/index.js';

const User = m.model({
    name: String,
});

const john = User({
    name: 'John',
})

console.log(john.toJSON());
