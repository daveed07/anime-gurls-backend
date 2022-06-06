const { queryGirl } = require('./query/girl');
const sql = require('./utils/sql');
const { sendServerStatus, sendError } = require('./utils/status');

exports.getImagesByTags = async (req, res) => {
    try {
        const tags = req.params.tags.split(',');
        const tagResult = await sql.query("SELECT * FROM tag WHERE name = ANY($1)", [tags]);

        let girls = [];

        for (let i = 0; i < tagResult.rowCount; i++) {
            let tag = tagResult.rows[i];
            let girlId = await sql.query("SELECT girl_id FROM tag_to_girl WHERE tag_id = $1", [tag.id]);
            if (sql.checkQuery(girlId)) {
                let girl = await queryGirl(girlId.rows[0].girl_id);
                if (girl) {
                    girls.push(girl);
                }
            }
        }
        sendServerStatus(res, girls, 200);
    } catch (err) {
        console.log(err);
        sendError(err, res);
    }
}