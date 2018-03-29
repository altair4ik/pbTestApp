const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const path = require('path');
const middlewares = jsonServer.defaults({static: path.join(__dirname, 'images')});
const multer = require('multer');
const mime = require('mime-types');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './images'))
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

const upload = multer({storage: storage}).single('file');

server.use(jsonServer.bodyParser);
server.use('/images', middlewares);
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE');
  next()
});

server.post('/photos',
  function (req, res, next) {
    upload(req, res, function (err) {
      if (err) {
        return res.status(404).json({'msg': 'Error uploading file!'});
      }
      req.body.url = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;
      next();
    });
  });

server.patch('/photos/:id?',
  function (req, res, next) {
    upload(req, res, function (err) {
      if (err) {
        return res.status(404).json({'msg': 'Error uploading file!'});
      }
      if (req.file) {
        req.body.url = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;
      }
      next();
    });
  });

server.use(router);

server.listen(3000, function () {
  console.log('JSON Server is running')
});
