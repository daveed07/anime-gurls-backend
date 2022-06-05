const { queryGirls } = require('./query/girls');
const sql = require('./utils/sql');
const { sendServerStatus, sendError } = require('./utils/status');

exports.getImagesByAnime = async (req, res) => {
  try {
    const girls = await sql.query("SELECT * FROM girl WHERE anime LIKE $1", [`%${req.params.anime}%`]);
    if (!sql.checkQuery(girls)) {
      sendServerStatus(res, girls.rows, 200);
      return;
    }

    let girlsRows = await queryGirls(girls);
    sendServerStatus(res, girlsRows, 200);
  } catch (err) {
    console.log(err);
    sendError(err, res);
  }
}