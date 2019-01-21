
import * as Lang from '../Model.js';
import { either } from 'fp-ts';


export const revive = (reviver : Lang.Reviver, instanceEncoded : Lang.ModelEncoded)
    : void | either.Either<Lang.DecodingReport, Lang.Model> => {
        if (typeof instanceEncoded === 'object' && instanceEncoded && 'decode' in instanceEncoded) {
            return either.right(instanceEncoded) as either.Right<any, Lang.Model>;
        }
        
        try {
            const revived = reviver(instanceEncoded);
            
            if (typeof revived !== 'undefined') {
                return either.right(revived) as either.Right<any, Lang.Model>;
            }
        } catch (reason) {
            return either.left(reason) as either.Left<Lang.DecodingReport, any>;
        }
        
        return undefined;
    };
