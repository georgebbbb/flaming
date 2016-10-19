'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = middleware;

var _func = require('./func');

var _expressUnless = require('express-unless');

var _expressUnless2 = _interopRequireDefault(_expressUnless);

var _secret = require('../consts/secret');

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _url = require('../url');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = (0, _expressJwt2.default)({
  secret: _secret.userJWTCount,
  credentialsRequired: true,
  getToken: function getToken(req) {
    return req.headers.authorization;
  }
});
auth.unless = _expressUnless2.default;

function middleware(app) {
  // app.use('/db/:dbName/collection/', checkApiToken);
  app.use('/db/:dbName', _func.handleCommonReq);
  app.use('/user/db/:dbName', _func.handleCommonReq);
  app.use(_url.baseUrl, _func.checkFindMethods);
  app.use('/user' + _url.baseUrl, _func.checkFindMethods);
  app.use('/user/db/:dbName/collection/', auth);
  app.use(_func.handleError);
}