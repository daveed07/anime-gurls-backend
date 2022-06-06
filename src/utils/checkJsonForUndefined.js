const check = (json, keys) => {
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (json[key] === undefined) {
            return {
                key: key,
                value: json[key]
            };
        }
    }

    return null;
}

/**
 * Check a JSON object for an undefined field.
 */
exports.checkJsonForUndefined = (json) => {
    return check(json, Object.keys(json));
}

exports.checkSpecificJsonForUndefined = (json, keys) => {
    return check(json, keys);
}