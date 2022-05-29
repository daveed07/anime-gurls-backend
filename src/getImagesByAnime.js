const pool = require('./pool.config');

exports.getImagesByAnime = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM girl WHERE anime = $1', [req.params.anime]);
    const results = result ? result.rows : null;
    res.status(200).json({ results });
    client.release();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error', err);
  }
}