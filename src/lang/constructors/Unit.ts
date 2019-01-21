
import * as ObjectUtil from '../../util/ObjectUtil.js';
import { either } from 'fp-ts';

import proxify from '../util/proxify.js';
import * as Lang from '../Model.js';
import * as DecodingUtil from '../extensions/decoding.js';


export class Unit extends Lang.BaseModel {
    equals(other : unknown) {
        return other instanceof Unit;
    }
    
    
    //
    // Transcoding
    //
    
    decode(instanceEncoded : Lang.ModelEncoded, reviver ?: Lang.Reviver) : either.Either<Lang.DecodingReport, Lang.Model> {
        if (reviver) {
            const revived = DecodingUtil.revive(reviver, instanceEncoded);
            if (revived) {
                return revived;
            }
        }
        
        if (instanceEncoded instanceof Unit) {
            return either.right(new Unit());
        }
        
        if (typeof instanceEncoded !== 'object' || instanceEncoded === null) {
            return either.left('Expected empty object');
        }
        
        return either.right(new Unit());
    }
    
    // encode(instance : Model) : ModelEncoded {}
    
    // validate(instance : Model) : either.Either<ValidityReport, Model> {}
    
    toJS() {
        return {};
    }
    
    toJSON() {
        return {};
    }
}

//export default proxify(Unit);
export default Unit;
