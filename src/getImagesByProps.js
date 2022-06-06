// const sql = require('./utils/sql');
// const queryProperty = require('./query/property').queryProperty;
// const queryGirl = require('./query/girl');
// const { sendServerStatus, sendError } = require('./utils/status');

exports.getImagesByProps = async (req, res) => {
    console.log("Yo");
    try {
        // Get params from ?
        const data = req.props;
        const result = await queryProperty(data);
        let girls = [];
        if (sql.checkQuery(result)) {
            for (let i = 0; i < result.length; i++) {
                let girlId = result[i].girl_id;
                if (girlId) {
                    girls.push(await queryGirl(girlId));
                }
            }
        }

        sendServerStatus(res, girls, 200);
    } catch (err) {
        console.log(err);
        sendError(err, res);
    }
}