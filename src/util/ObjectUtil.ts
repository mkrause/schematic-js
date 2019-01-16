
export const isPlainObject = (obj : unknown) : obj is object => {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    
    const proto = Object.getPrototypeOf(obj);
    return proto === null || proto === Object.prototype;
};

export const keysEqual = (obj1 : Object, obj2 : Object) => {
    const obj1Keys = Object.keys(obj1).sort();
    const obj2Keys = Object.keys(obj2).sort();
    
    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }
    
    for (let i = 0; i < obj1Keys.length; i++) {
        if (obj1Keys[i] !== obj2Keys[i]) {
            return false;
        }
    }
    
    return true;
};
