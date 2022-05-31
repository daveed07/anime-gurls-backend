const pool = require('./pool.config').pool;

exports.getRandomImage = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM girl ORDER BY RANDOM() LIMIT 1");
    res.status(200).json(result.rows[0]);
    client.release();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error', err);
  }
}