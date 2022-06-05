const queryGirl = require('./girl').queryGirl;

/**
 * Load the properties and tags for each girl in the array.
 */
exports.queryGirls = async (girls) => {
    let result = [];

    for (let i = 0; i < girls.rowCount; i++) {
        let girl = await queryGirl(girls.rows[i].id);
        if (girl) {
            result.push(girl);
        }
    }

    return result;
}