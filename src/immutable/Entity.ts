
import util from 'util';
import $msg from 'message-tag';
import * as ObjectUtil from '../util/ObjectUtil.js';
import { either } from 'fp-ts';

import * as Imm from 'immutable';

import * as Lang from '../lang/Model.js';
import * as DecodingUtil from '../lang/extensions/decoding.js';

import Model from '../lang/constructors/Model.js';
import Struct from '../lang/constructors/Struct.js';


interface RecordT {
    [key : string] : Lang.Model;
}

type EntityStatic = Lang.Model & {
    tag : 'immutable.entity';
    value : null;
    schema : { [propName : string] : Lang.ModelEncoded };
    prototype : Lang.Model;
    
    new <T extends RecordT>(value : T) : Entity<T>;
};

const Static = <T>() => (constructor : T) => constructor;

@Static<EntityStatic>()
export default class Entity<T extends RecordT> extends Lang.BaseModel {
    static readonly tag = 'immutable.entity';
    static readonly value = null;
    
    static equals(other : unknown) { return other === Entity; }
    static construct(instanceEncoded : Lang.ModelEncoded) : Lang.Model {
        return this.decode(instanceEncoded)
            .getOrElseL((reason : Lang.DecodingReport) => { throw new TypeError(reason); });
    }
    static toJSON() : unknown { return null } // TODO
    
    static schema = {};
    
    static decode(this : typeof Entity, instanceEncoded : Lang.ModelEncoded, reviver ?: Lang.Reviver) : either.Either<Lang.DecodingReport, Lang.Model> {
        if (reviver) {
            const revived = DecodingUtil.revive(reviver, instanceEncoded);
            if (revived) {
                return revived;
            }
        }
        
        if (!(this.prototype instanceof Entity)) {
            throw new TypeError('Expected `this` to be bound to the Entity class');
        }
        
        const schema = new Model().decode(this.schema)
            .getOrElseL(reason => { throw new TypeError(reason); });
        
        return schema.decode(instanceEncoded)
            .map((instance : Lang.Model) => {
                // We assume the schema is a struct, and therefore expect the result to be a struct instance
                if (!(instance instanceof Struct)) {
                    throw new TypeError($msg`Expected struct, given ${instance}`);
                }
                
                // Convert struct to entity instance
                return new this(instance.value);
            });
    }
    
    
    readonly tag = 'immutable.entity';
    readonly value : Imm.Record<T>;
    
    constructor(value : T) {
        super();
        this.value = Imm.Record(value)();
    }
    
    equals(other : unknown) {
        return other instanceof Entity && false; // TODO
    }
    
    decode(instanceEncoded : Lang.ModelEncoded, reviver ?: Lang.Reviver) : either.Either<Lang.DecodingReport, Lang.Model> {
        return either.left('TODO: Entity::decode');
    }
    
    // encode(instance : Model) : ModelEncoded {}
    
    // validate(instance : Model) : either.Either<ValidityReport, Model> {}
    
    get(propName : keyof T) {
        return this.value.get(propName);
    }
    
    toJSON() {
        return this.value.toJSON();
    }
}

if (util.inspect) {
    // @ts-ignore
    Entity.prototype[util.inspect.custom] = function() {
        return this.value.toJS();
    };
}


// const Entity2 : typeof Entity & { new() : number } = Object.setPrototypeOf(Entity, Object.assign(Object.create(Function.prototype), { foo: 42 }));
// new Entity2({}).foo;
