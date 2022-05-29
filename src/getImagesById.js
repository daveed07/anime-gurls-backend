const pool = require('./pool.config');

exports.getImagesById = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM images WHERE id = $1", [req.params.id]);
    const results = result.rows[0];
    res.status(200).json({ results });
    client.release();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error', err);
  }
}