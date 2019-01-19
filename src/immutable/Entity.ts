
import $msg from 'message-tag';
import * as ObjectUtil from '../util/ObjectUtil.js';
import { either } from 'fp-ts';

import * as Imm from 'immutable';

import * as Lang from '../lang/Model.js';
import Model from '../lang/constructors/Model.js';


interface RecordT {
    [key : string] : Lang.Model;
}

interface EntityStatic {
    schema : unknown;
}

export default abstract class Entity<T extends RecordT> extends Lang.Model {
    public readonly tag = 'immutable.entity';
    protected readonly value : Imm.Record<T>;
    
    
    static decode(instanceEncoded : Lang.ModelEncoded) : either.Either<Lang.ValidityReport, Lang.Model> {
        const self = this as unknown as EntityStatic;
        
        const schema = new Model().decode(self.schema)
            .getOrElseL(reason => { throw new TypeError(reason); });
        
        return schema.decode(instanceEncoded).map(instance => new self(instance.toJSON()));
    }
    
    
    
    
    
    constructor(value : T) {
        super();
        this.value = Imm.Record(value)();
    }
    
    equals(other : unknown) {
        return other instanceof Entity && false; // TODO
    }
    
    decode(instanceEncoded : Lang.ModelEncoded) : either.Either<Lang.ValidityReport, Lang.Model> {
        return either.left('');
    }
    
    // encode(instance : Model) : ModelEncoded {}
    
    // validate(instance : Model) : either.Either<ValidityReport, Model> {}
    
    toJSON() {
        return {};
    }
}
