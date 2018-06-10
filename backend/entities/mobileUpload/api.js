const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const keys = require('./../../../config/credentials');

const s3 = new aws.S3(keys.awsS3);

//config your keys.js
// {accessKeyId: "*************",
//   secretAccessKey: "*****************",
//   region: "*********}

// Initialize multers3 with our s3 config and other options
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'markmoo',
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, Date.now().toString() + '.png');
    },
  }),
});

const uploadGalary = multer({
  storage: multerS3({
    s3,
    bucket: 'usergalary',
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, Date.now().toString() + '.png');
    },
  }),
});

module.exports = app => {
  app.post('/upload', upload.single('photo'), (req, res, next) => {
    console.log('something is requested');
    res.json(req.file);
  });

  app.post('/upload_galary', uploadGalary.single('photo'), (req, res, next) => {
    console.log('something is requested');
    res.json(req.file);
  });
};
