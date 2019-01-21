
import $msg from 'message-tag';
import * as ObjectUtil from '../../util/ObjectUtil.js';
import { either } from 'fp-ts';

import proxify from '../util/proxify.js';
import * as Lang from '../Model.js';
import * as DecodingUtil from '../extensions/decoding.js';

import Unit from './Unit.js';
import Textual from './Textual.js';
import Text from './Text.js';
import Struct, { StructProps } from './Struct.js';


export class Model extends Lang.BaseModel {
    equals(other : unknown) {
        return other instanceof Model;
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
        
        if (instanceEncoded === String) {
            return either.right(new Textual());
        }
        
        if (typeof instanceEncoded === 'string' || instanceEncoded instanceof String) {
            return either.right(new Text(String(instanceEncoded)));
        }
        
        if (ObjectUtil.isPlainObject(instanceEncoded)) {
            if (Object.keys(instanceEncoded).length === 0) {
                return either.right(new Unit());
            } else {
                const props = Object.entries(instanceEncoded).reduce(
                    (acc, [propName, propEncoded]) => {
                        acc[propName] = Model.prototype.decode(propEncoded, reviver)
                            .getOrElseL(reason => {
                                throw new TypeError($msg`Invalid property ${propName}: ${reason}`);
                            });
                        return acc;
                    },
                    ({} as StructProps)
                );
                
                return either.right(new Struct(props));
            }
        }
        
        return either.left($msg`Unrecognized model, given ${instanceEncoded}`);
    }
    
    // encode(instance : Model) : ModelEncoded {}
    
    // validate(instance : Model) : either.Either<ValidityReport, Model> {}
    
    toJSON() {
        return { model$kind: 'model' };
    }
}

//export default proxify(Model);
export default Model;
