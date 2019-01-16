
import * as Lang from '../Model.js';


// const callable = <Constructor extends typeof Lang.Model>(Constructor : Constructor) : any => {
//     const instance = new Constructor();
//     return new Proxy(
//         Object.assign(
//             (instanceEncoded : Lang.ModelEncoded) : Lang.Model => instance.construct(instanceEncoded),
//         ),
//         {
//             get(target, prop) {
//                 return instance[prop];
//             },
//             getPrototypeOf(target) {
//                 return Constructor.prototype;
//             },
//         }
//     );
// };

// Take a constructor (a class), and override function application to allow for shorthand construction
// const callable = <Constructor extends typeof Model>(Constructor : Constructor) : Constructor => {
//     return new Proxy(Constructor, {
//         apply(target, thisArg, args) {
//             return target.construct(...args);
//         },
//     });
// };

// const singleton = (model : Lang.Model) : typeof model => {
//     const proxy = <typeof model><unknown>new Proxy(
//         (instanceEncoded : Lang.ModelEncoded) : Lang.Model => model.construct(instanceEncoded),
//         {
//             get(target, prop : keyof typeof model) {
//                 return model[prop];
//             },
//             getPrototypeOf(target) {
//                 return model.constructor.prototype;
//             },
//         }
//     );
    
//     return proxy;
// };


const proxifyInstance = (model : Lang.Model) : typeof model => {
    return <typeof model><unknown>new Proxy(
        (instanceEncoded : Lang.ModelEncoded) : Lang.Model => model.construct(instanceEncoded),
        {
            get(target, prop : keyof typeof model) {
                return model[prop];
            },
            getPrototypeOf(target) {
                return model.constructor.prototype;
            },
        }
    );
};


type ModelConstructor = typeof Lang.Model & { new(...args : any[]) : Lang.Model; };

export const proxifyClass = <Constructor extends ModelConstructor>(Constructor : Constructor) : typeof Constructor => {
        return <Constructor><unknown>new Proxy(
            Constructor,
            {
                construct(target, args) {
                    return proxifyInstance(new Constructor(...args));
                },
                // Allow class instantiation without `new`
                apply(target, thisArg, args) {
                    return proxifyInstance(new Constructor(...args));
                },
            }
        );
    };

export default proxifyClass;
