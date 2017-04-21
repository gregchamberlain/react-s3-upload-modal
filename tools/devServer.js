
var path = require('path');
var webpack = require('webpack');
var express = require('express');
var aws = require('aws-sdk');
var bodyParser = require('body-parser');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');

var app = express();
var s3 = new aws.S3();
var compiler = webpack(config);

app.use(bodyParser.json());

app.post('/sign', (req, res) => {
  const signedUrls = req.body.files.map(file => {
    const params = {
      Bucket: 'react-s3-upload-modal',
      Key: file.name,
      Expires: 60,
      ContentType: file.type,
      ACL: 'public-read'
    };
    return s3.getSignedUrl('putObject', params);
  });
  res.send(signedUrls);
});

app.use(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}));

app.use(hotMiddleware(compiler));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(3000, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
