const express = require('express');
const bodyParser = require('body-parser');
const getImages = require('./getImages');
const getRandomImage = require('./getRandomImage');
const getNSFWImages = require('./getNSFWImages');
const getImagesById = require('./getImagesById');
const getImagesByAnime = require('./getImagesByAnime');
const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(bodyParser.json());

app.route('/api/v1/imgs').get(getImages);

app.route('/api/v1/imgs/random').get(getRandomImage);

app.route('/api/v1/imgs/nsfw').get(getNSFWImages);

app.route('/api/v1/imgs/:id').get(getImagesById);

app.route('/api/v1/imgs/anime/:anime').get(getImagesByAnime);

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
})