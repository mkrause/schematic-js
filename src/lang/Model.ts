
import util from 'util';
import { either } from 'fp-ts';


export type Reviver = (instanceEncoded : ModelEncoded) => void | Model;

export type ModelEncoded = unknown;
export type ModelInternal = unknown;

export type DecodingReport = string;
export type ValidityReport = string;

export interface Model {
    tag : string;
    
    equals(other : unknown) : boolean;
    
    decode(instanceEncoded : ModelEncoded, reviver ?: Reviver) : either.Either<DecodingReport, Model>;
    // encode(instance : Model) : ModelEncoded;
    
    // validate(instance : Model) : either.Either<ValidityReport, Model>;
    
    construct(instanceEncoded : ModelEncoded) : Model;
    
    toJSON() : unknown;
}

export const Model = {};

export abstract class BaseModel {
    readonly tag : string;
    readonly value : ModelInternal = null;
    
    constructor(...args : any[]) {
        this.tag = this.constructor.name.toLowerCase();
    }
    
    abstract equals(other : unknown) : boolean;
    
    abstract decode(instanceEncoded : ModelEncoded, reviver ?: Reviver) : either.Either<DecodingReport, Model>;
    // abstract encode(instance : Model) : ModelEncoded;
    
    // abstract validate(instance : Model) : either.Either<ValidityReport, Model>;
    
    construct(instanceEncoded : ModelEncoded, reviver ?: Reviver) : Model {
        return this.decode(instanceEncoded, reviver)
            .getOrElseL((reason : ValidityReport) => { throw new TypeError(reason); });
    }
    
    abstract toJSON() : unknown;
}

if (util.inspect) {
    // @ts-ignore
    BaseModel.prototype[util.inspect.custom] = function() {
        return `${this.tag} ${util.inspect(this.value)}`;
    };
}

export default BaseModel;
