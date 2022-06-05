const pool = require('../pool.config').pool;

/**
 * Method to query the DB withouth having to open and close a client.
 * 
 * @param {String} query 
 * @param {Array} params 
 */
exports.query = async (query, params) => {
    try {
        const client = await pool.connect();
        const result = await client.query(query, params);
        client.release();

        if (result.rows.length > 0) {
            return result;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

/**
 * Check if a query worked successfully.
 */
exports.checkQuery = (result) => {
    if (!result) {
        return false;
    }
    
    if (result.rows.length > 0) {
        return true;
    }

    return false;
}