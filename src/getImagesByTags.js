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
                // Check to make sure we don't already have this girl
                if (girl) {
                    // fuckYou has no real name sense.
                    let fuckYou = false;
                    // Loop through the girls we already have
                    for (let j = 0; j < girls.length; j++) {
                        // If the ids match then fuckYou!
                        if (girl.id === girls[j].id) {
                            fuckYou = true;
                            break;
                        }
                    }
                    if (!fuckYou) {
                        girls.push(girl);
                    }
                }
            }
        }
        sendServerStatus(res, girls, 200);
    } catch (err) {
        sendError(err, res);
    }
}