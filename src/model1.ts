
namespace model {

//const x: string = 42;

const ObjectUtil = {
    mapEntries: () => {},
};


type Either<L, R> = ({ left: L } | { right: R });

type DecodingReport = string;
type ValidationReport = string;

interface ModelConstructor {
    (instanceEncoded: any): Model; // construct (decode + validate + to throwable)
}

interface ModelInterface {
    decode(instanceEncoded: any): Either<DecodingReport, Model>;
    encode(instance: Model): any;
    
    validate(instance: Model): Either<ValidationReport, Model>;
    
    equals(other: any): boolean;
    toJson(): any;
}

type Model = ModelConstructor & ModelInterface;


const model: Model = Object.assign(
    function(this: Model, instanceEncoded: any) {
        const decodingResult = this.decode(instanceEncoded);
        
        if ('left' in decodingResult) {
            throw decodingResult.left;
        } else {
            return decodingResult.right;
        }
    },
    {
        equals(other: any) {
            return true;
        },
        // match(cases) {
            
        // },
        
        decode(instanceEncoded: any) {
            return { left: "" };
        },
        encode(instance: Model) {
            return {};
        },
        validate(instance: Model) {
            return { left: "" };
        },
        
        toJson(this: Model) {
            return model.encode(this);
        },
    },
);


class Record implements ModelInterface {
    value: { [propName: string]: Model };
    
    constructor(record: { [propName: string]: Model }) {
        this.value = record;
    }
    
    equals(other: any) {
        return true;
    }
    
    decode(instanceEncoded: any) {
        return { left: "" };
    }
    encode(instance: Model) {
        return {};
    }
    validate(instance: Model) {
        return { left: "" };
    }
    
    toJson(this: Model) {
        return model.encode(this);
    }
}

// const record: Model = Object.assign(
//     function() {
        
//     },
//     Record.prototype,
// );


const User = model({
    name: String,
});

const john = User({
    name: 'John',
});

john.toJson().namex;

};
