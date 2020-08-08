/*
    Utility
*/
export function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) 
            copy[attr] = obj[attr];
    }
    return copy;
}

export function iif(condition,__true__,__false__) {
    if (condition)
        return __true__;
    else
        return __false__;
}

/*
    Gli oggetti:
        obj,src devono essere entrambi già creati.
        La funzione copia i campi di src in obj
        ad eccezione delle CHIAVI
*/
export function copyObj(obj,src) {
    let canCopy = true;

    if (null == src || "object" != typeof src) 
        canCopy = false;

    if (null == obj || "object" != typeof obj) 
        canCopy = false;

    if (canCopy) {
        for (var attr in src) {
            if (src.hasOwnProperty(attr)) {
                    //console.log(attr);
                    obj[attr] = src[attr];
            }
        }
    }
}

export function IsFunction(obj) {
    let ret = false;

    if (obj) {
        if (typeof obj === 'function') {
            ret = true;
        }
    }

    return ret;
}

export function IsObject(obj) {
    let ret = true;

    if (null == obj || "object" != typeof obj) 
        ret = false;

    return ret;
}

export function IsCustomObject(obj,constructorName) {
    let ret = false;

    if (IsObject(obj))
        try {
            let customName = constructorName.trim();
            let objectName = obj.constructor.name.trim();

            ret = (objectName === customName);
        }
        catch(e) {

        }

    return ret;
}