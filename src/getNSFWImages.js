const { sendError, sendServerStatus } = require('./utils/status');
const sql = require('./utils/sql');
const { queryGirls } = require('./query/girls');

exports.getNSFWImages = async (req, res) => {
  try {
    const girls = await sql.query("SELECT * FROM girl WHERE is_nsfw = TRUE");
    if (!sql.checkQuery(girls)) {
      sendServerStatus(res, [], 200);
      return;
    }
    let girlRows = await queryGirls(girls);

    sendServerStatus(res, girlRows, 200);
  } catch (err) {
    console.log(err);
    sendError(err, res);
  }
}