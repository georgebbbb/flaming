'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routes;

var _index = require('../url/index');

var _index2 = require('../model/index');

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function routes(app) {
  app.post('/user' + _index.baseUrl, function (req, res) {
    var url = req.db.url;
    var collectionName = req.params.collectionName;
    var body = req.body;

    body.userId = req.user._id;
    (0, _index3.default)(url).insertOne(collectionName, req.body).then(function (data) {
      return res.json(data);
    }).catch(function (err) {
      return console.log(err);
    });
  });

  app.post(_index.baseUrl, function (req, res) {
    console.log(1);
    var url = req.db.url;
    var collectionName = req.params.collectionName;
    var body = req.body;

    (0, _index3.default)(url).insertOne(collectionName, req.body).then(function (data) {
      return res.json(data);
    }).catch(function (err) {
      return console.log(err);
    });
  });

  app.get(_index.baseUrl + '/:id', function (req, res) {
    var url = req.db.url;
    var _req$params = req.params;
    var id = _req$params.id;
    var collectionName = _req$params.collectionName;

    (0, _index3.default)(url).findById(collectionName, id).then(function (data) {
      return res.json(data);
    }).catch(function (err) {
      console.log(error);
    });
  });

  app.get('/user' + _index.baseUrl, function (req, res) {
    var _req$db = req.db;
    var url = _req$db.url;
    var methods = _req$db.methods;
    var collectionName = req.params.collectionName;

    var query = req.db.query || {
      userId: req.user._id
    };
    (0, _index3.default)(url).find(collectionName, query, methods).then(function (data) {
      return res.json(data);
    }).catch(function (err) {
      return console.log(err);
    });
  });

  app.get(_index.baseUrl, function (req, res) {
    console.log(_index.baseUrl);
    var _req$db2 = req.db;
    var url = _req$db2.url;
    var query = _req$db2.query;
    var methods = _req$db2.methods;
    var collectionName = req.params.collectionName;

    (0, _index3.default)(url).find(collectionName, query, methods).then(function (data) {
      return res.json(data);
    }).catch(function (err) {
      return console.log(err);
    });
  });

  app.put('/user' + (_index.baseUrl + '/:id'), function (req, res) {
    var url = req.db.url;
    var _req$params2 = req.params;
    var id = _req$params2.id;
    var collectionName = _req$params2.collectionName;

    (0, _index3.default)(url).updateById(collectionName, id, req.body).then(function (data) {
      return res.json(data);
    }).catch(function (err) {
      return console.log(error);
    });
  });

  // app.put(baseUrl, (req, res) => {
  //   const {url, query, methods} = req.db
  //   const {collectionName} = req.params
  //   getModel(url).update(collectionName, query, req.body)
  //   .then((data) => res.json(data))
  //   .catch((err) => console.log(err))
  // })

  app.delete('/user' + (_index.baseUrl + '/:id'), function (req, res) {
    console.log(87611);
    var url = req.db.url;
    var _req$params3 = req.params;
    var id = _req$params3.id;
    var collectionName = _req$params3.collectionName;

    (0, _index3.default)(url).removeById(collectionName, id).then(function (data) {
      return res.json(data);
    }).catch(function (err) {
      return console.log(error);
    });
  });

  // app.delete(baseUrl, (req, res) => {
  //   const {url, query, methods} = req.db
  //   const {collectionName} = req.params
  //   getModel(url).remove(collectionName, query, req.body)
  //   .then((data) => res.json(data))
  //   .catch((err) => console.log(err))
  // })
  //登录
  app.post(_index.signin, function (req, res) {
    var _req$body = req.body;
    var username = _req$body.username;
    var password = _req$body.password;

    (0, _index3.default)(req.db.url).signin(username, password).then(function (data) {
      if (data) {
        res.json(data);
      } else {
        res.status(401).send('username,password error...');
      }
    }).catch(function (error) {
      return console.log(error);
    });
  });
  //注册
  app.post(_index.signup, function (req, res) {
    var _req$body2 = req.body;
    var username = _req$body2.username;
    var password = _req$body2.password;

    (0, _index3.default)(req.db.url).signup(username, password).then(function (data) {
      return data;
    }).then(function (data) {
      return res.json(data);
    }).catch(function (error) {
      return console.log(error);
    });
  });
}