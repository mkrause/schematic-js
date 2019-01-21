
import 'mocha';
import { expect } from 'chai';

import schematic from '../lib-cjs/index.js';
import * as Lang from '../lib-cjs/lang/Model.js';


describe('schematic', () => {
    describe('constructors', () => {
        it('should construct model from object literal', () => {
            const User = schematic.model.construct({
                name: String,
            });
            
            expect(User).to.be.an.instanceOf(Lang.BaseModel);
            expect(User).to.be.an.instanceOf(schematic.Constructors.Struct);
            
            expect(User.get('name')).to.be.an.instanceOf(Lang.BaseModel);
            expect(User.get('name')).to.be.an.instanceOf(schematic.Constructors.Textual);
        });
    });
});
