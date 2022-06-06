const sql = require('./utils/sql');
const queryGirl = require('./query/girl').queryGirl;
const queryProperty = require('./query/property').queryProperty;
const { sendServerStatus, sendError } = require('./utils/status');

exports.getImagesByProps = async (req, res) => {
    try {
        // Get params from ?
        const data = req.query;
        const result = await queryProperty(data);
        
        let girls = [];
        if (sql.checkQuery(result)) {
            for (let i = 0; i < result.rowCount; i++) {
                let girlId = result.rows[i].girl_id;
                if (girlId) {
                    girls.push(await queryGirl(girlId));
                }
            }
        }

        sendServerStatus(res, girls, 200);
    } catch (err) {
        sendError(err, res);
    }
}