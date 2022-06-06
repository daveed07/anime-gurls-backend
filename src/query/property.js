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

    if (data.hair_color !== undefined) {
        query += " hair_color = $1 ";
        seperate = true;
        params.push(data.hair_color);
    }

    if (data.hair_length !== undefined) {
        query += seperate ? " " + seperator + " " : "";
        query += " hair_length = $2 ";
        seperate = true;
        params.push(data.hair_length);
    }

    if (data.breasts !== undefined) {
        query += seperate ? " " + seperator + " " : "";
        query += " breasts = $3 ";
        seperate = true;
        params.push(data.breasts);
    }

    if (data.eye_color !== undefined) {
        query += seperate ? " " + seperator + " " : "";
        query += " eye_color = $4 ";
        seperate = true;
        params.push(data.eye_color);
    }

    console.log(query);

    return await sql.query(query, params);
}