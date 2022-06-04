const express = require('express');
const bodyParser = require('body-parser');
const getImages = require('./getImages').getImages;
const getRandomImage = require('./getRandomImage').getRandomImage;
const getNSFWImages = require('./getNSFWImages').getNSFWImages;
const getImagesById = require('./getImagesById').getImagesById;
const getImagesByAnime = require('./getImagesByAnime').getImagesByAnime;
const postGirl = require('./postGirl').postGirl;
const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.route('/api/v1/imgs').get(getImages);

app.route('/api/v1/imgs/random').get(getRandomImage);

app.route('/api/v1/imgs/nsfw').get(getNSFWImages);

app.route('/api/v1/imgs/:id').get(getImagesById);

app.route('/api/v1/imgs/anime/:anime').get(getImagesByAnime);

app.route('/api/v1/imgs/upload').post(postGirl);

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
})