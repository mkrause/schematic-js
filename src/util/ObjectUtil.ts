
export const isPlainObject = (obj : unknown) : obj is object => {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    
    const proto = Object.getPrototypeOf(obj);
    return proto === null || proto === Object.prototype;
};

export const keysEqual = (obj1 : Object, obj2 : Object) => {
    for (const key of Object.keys(obj1)) {
        if (!obj2.hasOwnProperty(key)) {
            return false;
        }
    }
    
    return true;
};
