
import { either } from 'fp-ts';


export type ModelEncoded = unknown;
export type ModelInternal = unknown;

export type DecodingReport = string;
export type ValidityReport = string;

export interface ModelInterface {
    tag : string;
    
    equals(other : unknown) : boolean;
    
    decode(instanceEncoded : ModelEncoded) : either.Either<DecodingReport, Model>;
    // encode(instance : Model) : ModelEncoded;
    
    // validate(instance : Model) : either.Either<ValidityReport, Model>;
    
    construct(instanceEncoded : ModelEncoded) : Model;
    
    toJSON() : unknown;
}

export abstract class Model implements ModelInterface {
    public readonly tag : string;
    protected readonly value : ModelInternal = null;
    
    constructor(...args : any[]) {
        this.tag = this.constructor.name.toLowerCase();
    }
    
    abstract equals(other : unknown) : boolean;
    
    abstract decode(instanceEncoded : ModelEncoded) : either.Either<DecodingReport, Model>;
    // abstract encode(instance : Model) : ModelEncoded;
    
    // abstract validate(instance : Model) : either.Either<ValidityReport, Model>;
    
    construct(instanceEncoded : ModelEncoded) : Model {
        return this.decode(instanceEncoded)
            .getOrElseL((reason : ValidityReport) => { throw new TypeError(reason); });
    }
    
    abstract toJSON() : unknown;
    
    [require('util').inspect.custom](depth : number) {
        return `${this.tag} ${JSON.stringify(this.value)}`;
    }
}

export default Model;
