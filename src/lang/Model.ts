
import { either } from 'fp-ts';


export type ModelEncoded = unknown;
export type ModelInternal = unknown;

export type DecodingReport = string;
export type ValidityReport = string;

export interface ModelInterface {
    equals(other : unknown) : boolean;
    
    decode(instanceEncoded : ModelEncoded) : either.Either<DecodingReport, Model>;
    encode(instance : Model) : ModelEncoded;
    
    validate(instance : Model) : either.Either<ValidityReport, Model>;
    
    toJson() : unknown;
}

export abstract class Model implements ModelInterface {
    protected readonly value : ModelInternal;
    
    abstract equals(other : unknown) : boolean;
    
    abstract decode(instanceEncoded : ModelEncoded) : either.Either<DecodingReport, Model>;
    abstract encode(instance : Model) : ModelEncoded;
    
    abstract validate(instance : Model) : either.Either<ValidityReport, Model>;
    
    abstract toJson() : unknown;
}

export default Model;
