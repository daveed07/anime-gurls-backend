const sql = require("../utils/sql");

exports.queryProperties = async (girlId) => {
    const result = await sql.query("SELECT * FROM property WHERE girl_id = $1", [girlId]);
    if (sql.checkQuery(result)) {
        return result.rows[0];
    }
}