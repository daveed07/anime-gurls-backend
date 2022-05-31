const pool = require('./pool.config').pool;

exports.getNSFWImages = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM girl WHERE is_nsfw = true");
    res.status(200).json(result.rows);
    client.release();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error', err);
  }
}