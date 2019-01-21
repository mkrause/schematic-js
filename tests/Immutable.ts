
import 'mocha';
import { expect } from 'chai';

import schematic, { Immutable as Imm } from '../lib-cjs/index.js';
import * as Lang from '../lib-cjs/lang/Model.js';


describe('Immutable support', () => {
    const reviver = instanceEncoded => {
        if (instanceEncoded.prototype instanceof Imm.Entity) {
            return instanceEncoded;
        }
        return undefined;
    };
    
    describe('Entity', () => {
        it('should be constructable as a model', () => {
            class User extends Imm.Entity {
                static schema = {
                    name: String,
                };
            }
            
            expect(() => { schematic.model.construct(User, reviver); }).to.not.throw(TypeError);
            
            const schema = schematic.model.construct(User, reviver);
            
            expect(typeof schema).to.equals('function');
            expect(schema.prototype).to.be.instanceof(Imm.Entity);
            expect(schema.prototype).to.be.instanceof(Lang.BaseModel);
        });
        
        it('should construct entity instance from object literal', () => {
            class User extends Imm.Entity {
                static schema = {
                    name: String,
                };
            }
            
            expect(() => { User.construct({ name: 'Alice' }, reviver); }).to.not.throw(TypeError);
            
            const alice = User.construct({ name: 'Alice' }, reviver);
            
            expect(alice).to.be.instanceof(Imm.Entity);
            expect(String(alice.get('name'))).to.equal('Alice');
        });
    });
});
