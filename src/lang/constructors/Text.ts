
import { either } from 'fp-ts';

import * as Lang from '../Model.js';


export default class Text extends Lang.Model {
    protected readonly value : string;
    
    constructor(text : string) {
        super();
        this.value = text;
    }
    
    equals(other : unknown) {
        return other instanceof Text && other.value === this.value;
    }
    
    
    //
    // Transcoding
    //
    
    decode(instanceEncoded : Lang.ModelEncoded): either.Either<Lang.ValidityReport, Lang.Model> {
        if (typeof instanceEncoded === 'string' || instanceEncoded instanceof String) {
            return either.right(new Text(String(instanceEncoded)));
        }
        
        return either.left('Expected string');
    }
    
    // encode(instance : Model) : ModelEncoded {}
    
    // validate(instance : Model) : either.Either<ValidityReport, Model> {}
    
    // toJson() : unknown {}
}
