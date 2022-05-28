const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const images = require('./images.json');

app.use(bodyParser.json());

app.route('/api/v1/imgs').get((req, res) => {
  res.send(images);
});

app.route('/api/v1/imgs/random').get((req, res) => {
  const random = Math.floor(Math.random() * images.length);
  res.send(images[random]);
});

app.route('/api/v1/imgs/nsfw').get((req, res) => {
  const nsfw = images.filter(image => image.is_nsfw);
  res.send(nsfw);
});

app.route('/api/v1/imgs/:id').get((req, res) => {
  const id = req.params.id;
  const img = images.find(img => img.id === id);
  res.send(img);
});


app.route('/api/v1/imgs/anime/:anime').get((req, res) => {
  const anime = req.params.anime;
  const img = images.filter(img => img.anime === anime);
  res.send(img);
})

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
})