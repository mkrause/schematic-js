
import * as ObjectUtil from '../../util/ObjectUtil.js';
import { either } from 'fp-ts';

import * as Lang from '../Model.js';


export default class Unit extends Lang.Model {
    equals(other : unknown) {
        return other instanceof Unit;
    }
    
    
    //
    // Transcoding
    //
    
    decode(instanceEncoded : Lang.ModelEncoded): either.Either<Lang.ValidityReport, Lang.Model> {
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
    
    // toJson() : unknown {}
}
