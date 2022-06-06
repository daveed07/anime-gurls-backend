/**
 * Check a JSON object for an undefined field.
 */
exports.checkJsonForUndefined = (json) => {
    for (let key in json) {
        if (json[key] === undefined) {
            return {
                key: key,
                value: json[key]
            };
        }
    }

    return null;
}

exports.checkSpecificJsonForUndefined = (json, keys) => {
    for (let key in keys) {
        if (json[key] === undefined) {
            return {
                key: key,
                value: json[key]
            };
        }
    }

    return null;
}