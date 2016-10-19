'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkFindMethods = checkFindMethods;
exports.handleCommonReq = handleCommonReq;
exports.handleError = handleError;
exports.checkApiToken = checkApiToken;
exports.handleAuthToken = handleAuthToken;

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _secret = require('../consts/secret');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//检查传过来的函数名是否正确
function checkFindMethods(req, res, next) {
  var methods = req.db.methods;

  if (methods) {
    methods = _lodash2.default.keys(methods).filter(function (method) {
      return ['limit', 'sort'].indexOf(method) === -1;
    });
    if (methods.length > 0) {
      res.status(500).json({ error: methods.join(',') + "error" });
      return;
    }
  }
  next();
}

//统一处理请求参数包括 dbname collection
function handleCommonReq(req, res, next) {
  var db = {
    dbName: req.params.dbName,
    collectionName: req.params.dbName,
    url: 'mongodb://localhost:27017/' + req.params.dbName
  };
  var header = req.headers["x-db"];
  if (header) {
    var _JSON$parse = JSON.parse(header);

    var query = _JSON$parse.query;
    var methods = _JSON$parse.methods;

    db.query = query;
    db.methods = methods;
  }
  _lodash2.default.set(req, 'db', db);
  next();
}

//处理错误
function handleError(err, req, res, next) {
  console.log("err.name" + err.name);
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  } else {
    console.log(err);
  }
}
//checkApiToken
function checkApiToken(req, res, next) {}
// jwt({
//   secret: (req) => {
//     console.log(`${userJWTCount}${req.params.dbName}`)
//     return `${userJWTCount}${req.params.dbName}`
//   },
//   credentialsRequired: true,
//   getToken: (req) => req.headers.api_authorization
// })

//处理authtoken
function handleAuthToken(req, res, next) {
  (0, _expressJwt2.default)({
    secret: _secret.userJWTCount,
    credentialsRequired: true,
    getToken: function getToken(req) {
      return req.headers.authorization;
    }
  });
  next();
}