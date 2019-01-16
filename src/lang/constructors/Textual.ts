
import $msg from 'message-tag';
import * as ObjectUtil from '../../util/ObjectUtil.js';
import { either } from 'fp-ts';

import proxify from '../util/proxify.js';
import * as Lang from '../Model.js';

import Text from './Text.js';


export class Textual extends Lang.Model {
    equals(other : unknown) {
        return other instanceof Textual;
    }
    
    
    //
    // Transcoding
    //
    
    decode(instanceEncoded : Lang.ModelEncoded): either.Either<Lang.ValidityReport, Lang.Model> {
        if (instanceEncoded instanceof Text) {
            return either.right(instanceEncoded);
        }
        
        if (typeof instanceEncoded === 'string' || instanceEncoded instanceof String) {
            return either.right(new Text(String(instanceEncoded)));
        }
        
        return either.left($msg`Expected string, given ${instanceEncoded}`);
    }
    
    // encode(instance : Model) : ModelEncoded {}
    
    // validate(instance : Model) : either.Either<ValidityReport, Model> {}
    
    toJSON() {
        return { mu$kind: 'textual' };
    }
}

export default proxify(Textual);
