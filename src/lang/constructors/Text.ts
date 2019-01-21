
import $msg from 'message-tag';
import { either } from 'fp-ts';

import proxify from '../util/proxify.js';
import * as Lang from '../Model.js';
import * as DecodingUtil from '../extensions/decoding.js';


export class Text extends Lang.BaseModel {
    readonly value : string;
    
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
    
    decode(instanceEncoded : Lang.ModelEncoded, reviver ?: Lang.Reviver): either.Either<Lang.DecodingReport, Lang.Model> {
        if (reviver) {
            const revived = DecodingUtil.revive(reviver, instanceEncoded);
            if (revived) {
                return revived;
            }
        }
        
        if (typeof instanceEncoded === 'string' || instanceEncoded instanceof String) {
            const instanceString = String(instanceEncoded);
            
            if (instanceString !== this.value) {
                return either.left(
                    $msg`Invalid instance, expected ${this.value}, given ${instanceString}`
                );
            }
            
            return either.right(new Text(instanceString));
        }
        
        return either.left($msg`Expected string, given ${instanceEncoded}`);
    }
    
    // encode(instance : Model) : ModelEncoded {}
    
    // validate(instance : Model) : either.Either<ValidityReport, Model> {}
    
    toJSON() {
        return this.value;
    }
}

//export default proxify(Text);
export default Text;
