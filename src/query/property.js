const sql = require("../utils/sql");

exports.queryProperties = async (girlId) => {
    const result = await sql.query("SELECT * FROM property WHERE girl_id = $1", [girlId]);
    if (sql.checkQuery(result)) {
        return result.rows[0];
    }
}

exports.queryProperty = async (data) => {
    let query = "SELECT girl_id FROM property WHERE";
    let params = [];
    let seperator = data.sep !== undefined ? data.sep : "OR";
    let seperate = false;

    const getParamNum = () => {
        return "$" + (params.length + 1);
    }

    if (data.hair_color !== undefined) {
        query += ` hair_color = ${getParamNum()} `;
        seperate = true;
        params.push(data.hair_color.toLowerCase());
    }

    if (data.hair_length !== undefined) {
        query += seperate ? " " + seperator + " " : "";
        query += ` hair_length = ${getParamNum()} `;
        seperate = true;
        params.push(data.hair_length.toLowerCase());
    }

    if (data.breasts !== undefined) {
        query += seperate ? " " + seperator + " " : "";
        query += ` breasts = ${getParamNum()} `;
        seperate = true;
        params.push(data.breasts.toLowerCase());
    }

    if (data.eye_color !== undefined) {
        query += seperate ? " " + seperator + " " : "";
        query += ` eye_color = ${getParamNum()} `;
        seperate = true;
        params.push(data.eye_color.toLowerCase());
    }

    console.log(query);
    console.log(params);

    return await sql.query(query, params);
}