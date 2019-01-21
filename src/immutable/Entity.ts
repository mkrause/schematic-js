
import $msg from 'message-tag';
import * as ObjectUtil from '../util/ObjectUtil.js';
import { either } from 'fp-ts';

import * as Imm from 'immutable';

import * as Lang from '../lang/Model.js';
import Model from '../lang/constructors/Model.js';


interface RecordT {
    [key : string] : Lang.Model;
}

type EntityStatic = Lang.Model & {
    schema : unknown;
};

export default <EntityStatic>class Entity<T extends RecordT> extends Lang.Model {
    static readonly tag = 'immutable.entity';
    static readonly value = null;
    
    static equals(other : unknown) { return other === Entity; }
    static construct(instanceEncoded : Lang.ModelEncoded) : Lang.Model {
        return this.decode(instanceEncoded)
            .getOrElseL((reason : Lang.ValidityReport) => { throw new TypeError(reason); });
    }
    static toJSON() { return null } // TODO
    
    static schema = null;
    
    public readonly tag = 'immutable.entity';
    protected readonly value : Imm.Record<T>;
    
    static decode(this : typeof Entity, instanceEncoded : Lang.ModelEncoded) : either.Either<Lang.ValidityReport, Lang.Model> {
        if (!(this.prototype instanceof Entity)) {
            throw new TypeError('Expected `this` to be bound to the Entity class');
        }
        
        const schema = new Model().decode(this.schema)
            .getOrElseL(reason => { throw new TypeError(reason); });
        
        return schema.decode(instanceEncoded)
            .map((instance : Lang.Model) => new this(instance.toJSON() as RecordT));
        // return schema.decode(instanceEncoded);
    }    
    
    
    constructor(value : T) {
        super();
        this.value = Imm.Record(value)();
    }
    
    equals(other : unknown) {
        return other instanceof Entity && false; // TODO
    }
    
    decode(instanceEncoded : Lang.ModelEncoded) : either.Either<Lang.ValidityReport, Lang.Model> {
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

// const Entity2 : typeof Entity & { new() : number } = Object.setPrototypeOf(Entity, Object.assign(Object.create(Function.prototype), { foo: 42 }));
// new Entity2({}).foo;
