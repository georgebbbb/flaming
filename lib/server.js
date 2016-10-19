'use strict';

var _mongodb = require('mongodb');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./middleware/index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _bodyParser.urlencoded)({ extended: false }));
app.use((0, _bodyParser.json)());

// 中间件
(0, _index4.default)(app);
// 路由
(0, _index2.default)(app);

app.listen(4000);