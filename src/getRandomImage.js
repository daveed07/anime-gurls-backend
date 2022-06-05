const queryGirl = require('./query/girl').queryGirl;
const sql = require('./utils/sql');
const { sendError, sendServerStatus } = require('./utils/status');

exports.getRandomImage = async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM girl ORDER BY RANDOM() LIMIT 1");
    
    if (!sql.checkQuery(result)) {
      sendServerStatus(res, result.rows, 200);
      return;
    }

    const girl = await queryGirl(result.rows[0].id);

    sendServerStatus(res, girl, 200);
  } catch (err) {
    console.log(err);
    sendError(err, res);
  }
}