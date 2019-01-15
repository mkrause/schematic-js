
import { either } from 'fp-ts';

import * as Lang from '../Model.js';


export default class Model extends Lang.Model {
    equals(other : unknown) {
        return other instanceof Lang.Model;
    }
    
    
    //
    // Transcoding
    //
    
    decode(instanceEncoded : Lang.ModelEncoded): either.Either<Lang.ValidityReport, Lang.Model> {
        return either.left('TODO');
    }
    
    // encode(instance : Model) : ModelEncoded {}
    
    // validate(instance : Model) : either.Either<ValidityReport, Model> {}
    
    // toJson() : unknown {}
}
