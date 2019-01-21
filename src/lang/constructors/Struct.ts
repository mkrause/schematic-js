
import $msg from 'message-tag';
import * as ObjectUtil from '../../util/ObjectUtil.js';
import { either } from 'fp-ts';

import proxify from '../util/proxify.js';
import * as Lang from '../Model.js';


export interface StructProps {
    [key : string] : Lang.Model;
}

export class Struct<T extends StructProps> extends Lang.Model {
    readonly value : T;
    
    constructor(props : T) {
        super();
        this.value = props;
    }
    
    equals(other : unknown) {
        if (other instanceof Struct) {
            return Object.entries(other).reduce(
                (acc, [propName, prop]) => {
                    return this.value.hasOwnProperty(propName) && this.value[propName].equals(prop);
                },
                true,
            );
        }
        
        return false;
    }
    
    
    //
    // Transcoding
    //
    
    decode(instanceEncoded : Lang.ModelEncoded): either.Either<Lang.ValidityReport, Lang.Model> {
        if (typeof instanceEncoded !== 'object' || instanceEncoded === null) {
            return either.left($msg`Expected object, given ${instanceEncoded}`);
        }
        
        if (!ObjectUtil.keysEqual(instanceEncoded, this.value)) {
            return either.left(
                $msg`Invalid property set, expected ${Object.keys(this.value)}, given ${Object.keys(instanceEncoded)}`
            );
        }
        
        const props : T = Object.entries(instanceEncoded).reduce(
            (acc, [propName, propEncoded]) => {
                const propResult = this.value[propName].decode(propEncoded);
                if (propResult.isRight()) {
                    acc[propName] = propResult.value;
                } else {
                    throw new TypeError(propResult.value);
                }
                
                return acc;
            },
            ({} as T)
        );
        
        return either.right(new Struct(props));
    }
    
    // encode(instance : Model) : ModelEncoded {}
    
    // validate(instance : Model) : either.Either<ValidityReport, Model> {}
    
    get(propName : keyof T) {
        return this.value[propName];
    }
    
    toJSON() {
        return Object.entries(this.value).reduce(
            (acc, [propName, prop]) => {
                acc[propName] = prop.toJSON();
                return acc;
            },
            ({} as { [propName : string] : unknown })
        );
    }
}

//const _Struct = proxify(Struct);
//export default _Struct;
export default Struct;
