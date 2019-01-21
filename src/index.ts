
import * as Lang from './lang/Model.js';
import ModelInterface from './lang/Model.js';

import Model from './lang/constructors/Model.js';
import Unit from './lang/constructors/Unit.js';
import Textual from './lang/constructors/Textual.js';
import Text from './lang/constructors/Text.js';
import Struct from './lang/constructors/Struct.js';


const m = {
    Model: Lang.Model,
    
    Constructor: {
        Model,
        Unit,
        Textual,
        Text,
        Struct,
    },
    
    // Shorthands
    model: new Model(),
    unit: new Unit(),
    text: new Textual(),
};

export default m;





import ImmEntity from './immutable/Entity.js';

export const Imm = {
    Entity: ImmEntity,
};






import { either } from 'fp-ts';
export const makeConstructor = (cn : Function) : either.Either<Lang.DecodingReport, Lang.Model> => {
    return either.right(class extends Lang.BaseModel {
        static readonly tag = cn.name;
        static readonly value = null;
        
        static equals(other : unknown) { return other === cn; }
        static construct(instanceEncoded : Lang.ModelEncoded) : Lang.Model {
            return this.decode(instanceEncoded)
                .getOrElseL((reason : Lang.DecodingReport) => { throw new TypeError(reason); });
        }
        static toJSON() { return null } // TODO
        
        static decode(instanceEncoded : Lang.ModelEncoded) : either.Either<Lang.DecodingReport, Lang.Model> {
            try {
                return either.right(cn(instanceEncoded));
            } catch (reason) {
                return either.left(reason);
            }
        }
        
        
        
        readonly tag = `${cn.name}_instance`;
        readonly value : unknown;
        
        constructor(value : unknown) {
            super();
            this.value = value;
        }
        
        equals(other : unknown) {
            return false; // TODO
        }
        
        decode(instanceEncoded : Lang.ModelEncoded) : either.Either<Lang.DecodingReport, Lang.Model> {
            return either.left('TODO');
        }
        
        // encode(instance : Model) : ModelEncoded {}
        
        // validate(instance : Model) : either.Either<ValidityReport, Model> {}
        
        toJSON() {
            return 'TODO';
        }
    });
};
