const pool = require('./pool.config');

exports.getRandomImage = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM images ORDER BY RANDOM() LIMIT 1');
    const results = result.rows[0];
    res.status(200).json({ results });
    client.release();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error', err);
  }
}