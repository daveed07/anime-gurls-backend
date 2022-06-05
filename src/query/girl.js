const sql = require('../utils/sql');
const queryProperties = require("./property").queryProperties;
const queryTags = require("./tag").queryTags;

const _queryGirl = async (query, params) => {
    const res = await sql.query(query, params);
    if (sql.checkQuery(res)) {
        return res.rows[0];
    }

    return false;
}

const queryGirlFromId = async (girlId) => {
    return await _queryGirl("SELECT * FROM girl WHERE id = $1", [girlId]);
}

const queryGirlFromUrl = async (url) => {
    return await _queryGirl("SELECT * FROM girl WHERE url = $1", [url]);
}

exports.queryGirl = async (identifier) => {
    let girl = null;
    // Check if identifier is a integer or a string
    if (Number.isInteger(identifier)) {
        girl = await queryGirlFromId(identifier);
    } else {
        girl = await queryGirlFromUrl(identifier);
    }

    if (!girl) {
        return false;
    }

    // Grab properties and tags
    const properties = await queryProperties(girl.id);
    const tags = await queryTags(girl.id);

    return {
        girl: girl,
        properties: properties,
        tags: tags
    };
}
