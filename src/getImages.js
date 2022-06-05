const sql = require('./utils/sql');
const girlQuery = require('./query/girl').queryGirl;

exports.getImages = async (req, res) => {
  try {
    const girls = await sql.query("SELECT * FROM girl");
    if (!sql.checkQuery(girls)) {
      res.status(200).send({ result: "No girls nigga" });
      return;
    }

    let girlRes = [];
    // Loop through all girls
    for (let i = 0; i < girls.rowCount; i++) {
      let girl = await girlQuery(girls.rows[i].id);
      if (girl) {
        girlRes.push(girl);
      }
    }

    res.status(200).send({ girls: girlRes });
  } catch (err) {
    console.log(err);
    res.status(500).send({ "Server error": err });
  }
}