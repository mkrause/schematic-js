
import 'mocha';
import { expect } from 'chai';

import schematic from '../lib-cjs/index.js';
import * as Lang from '../lib-cjs/lang/Model.js';


describe('schematic', () => {
    describe('constructors', () => {
        describe('Constructors.Model', () => {
            it('should construct model from object literal', () => {
                const User = schematic.model.construct({
                    name: String,
                });
                
                expect(User).to.be.instanceOf(Lang.BaseModel);
                expect(User).to.be.instanceOf(schematic.Constructors.Struct);
                
                expect(User.get('name')).to.be.instanceOf(Lang.BaseModel);
                expect(User.get('name')).to.be.instanceOf(schematic.Constructors.Textual);
            });
        });
        
        describe('Constructors.Struct', () => {
            it('should construct model from object literal', () => {
                const User = schematic.model.construct({
                    name: String,
                });
                
                expect(() => {
                    User.construct({
                        name: 42,
                    });
                }).to.throw(TypeError);
                
                const alice = User.construct({
                    name: 'Alice',
                });
                
                expect(alice.get('name')).to.be.instanceOf(schematic.Constructors.Text);
                expect(String(alice.get('name'))).to.equal('Alice');
            });
        });
    });
});
