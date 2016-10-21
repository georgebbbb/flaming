'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = getModel;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongodb = require('mongodb');

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _secret = require('../consts/secret');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jwt = _bluebird2.default.promisifyAll(require('jsonwebtoken'));


var MongoClient = _bluebird2.default.promisifyAll(require("mongodb").MongoClient);

function decorateData(data, methods) {
  _lodash2.default.mapValues(methods, function (params, func) {
    data = data[func](params);
  });
  return data.toArray();
}


var port = process.env.MONGODB_PORT_27017_TCP_PORT || '27017';
var addr = process.env.MONGODB_PORT_27017_TCP_ADDR || 'localhost';
var instance = process.env.MONGODB_INSTANCE_NAME || 'mocha';
var password = process.env.MONGODB_PASSWORD;
var username = process.env.MONGODB_USERNAME;

var Model = function () {
  function Model(url) {
    _classCallCheck(this, Model);

    this.connect = MongoClient.connect(url);
  }

  _createClass(Model, [{
    key: 'insert',
    value: function insert(collectionName) {
      var fileds = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var methods = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      return this.connect.then(function (db) {
        return db.collection(collectionName).insert(fileds).then(function (result) {
          //Todo: result.insertedIds
          //返回修改后的数据
        });
      });
    }
  }, {
    key: 'insertOne',
    value: function insertOne(collectionName) {
      var _this = this;

      var fileds = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var methods = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      return this.connect.then(function (db) {
        return db.collection(collectionName).insertOne(fileds).then(function (result) {
          return _this.findById(collectionName, result.insertedId);
        });
      });
    }
  }, {
    key: 'findOne',
    value: function findOne(collectionName) {
      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var methods = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      return this.connect.then(function (db) {
        return db.collection(collectionName).findOne(query);
      });
    }
  }, {
    key: 'findById',
    value: function findById(collectionName, id) {
      return this.findOne(collectionName, { '_id': new _mongodb.ObjectId(id) });
    }
  }, {
    key: 'find',
    value: function find(collectionName) {
      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var methods = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      console.log(collectionName);
      return this.connect.then(function (db) {
        return db.collection(collectionName).find(query);
      }).then(function (data) {
        return decorateData(data, methods);
      });
    }
  }, {
    key: 'updateOne',
    value: function updateOne(collectionName) {
      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var fileds = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
      var methods = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

      return this.connect.then(function (db) {
        return db.collection(collectionName).updateOne(query, fileds);
      });
    }
  }, {
    key: 'updateById',
    value: function updateById(collectionName) {
      var _this2 = this;

      var fileds = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var methods = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      return this.connect.then(function (db) {
        return _this2.findById(collectionName, fileds._id).then(function (content) {
          content = _lodash2.default.merge(content, fileds);
          delete content._id;
          return db.collection(collectionName).updateOne({ '_id': new _mongodb.ObjectId(fileds._id) }, content);
        });
      }).then(function (result) {
        return _this2.findById(collectionName, fileds._id);
      });
    }
  }, {
    key: 'update',
    value: function update(collectionName) {
      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var fileds = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
      var methods = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

      return this.connect.then(function (db) {
        return db.collection(collectionName).update(query, fileds);
      });
    }
  }, {
    key: 'removeOne',
    value: function removeOne(collectionName) {
      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return this.connect.then(function (db) {
        return db.collection(collectionName).removeOne(query);
      });
    }
  }, {
    key: 'removeById',
    value: function removeById(collectionName) {
      var id = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

      return this.removeOne(collectionName, { '_id': new _mongodb.ObjectId(id) });
    }
  }, {
    key: 'remove',
    value: function remove(collectionName) {
      var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return this.connect.then(function (db) {
        return db.collection(collectionName).remove(query);
      });
    }
  }, {
    key: 'signdev',
    value: function signdev(username, dbname) {
      if (!username || !dbname) return false;
      return this.findOne('user', { username: username }).then(function (user) {
        console.log(user, 11119);
        console.log(jwt.sign({ _id: user._id }, '' + _secret.apiJWTCount + dbname));
        if (user) {
          return {
            token: jwt.sign({ _id: user._id }, '' + _secret.apiJWTCount + dbname)
          };
        } else {
          return false;
        }
      });
    }
  }, {
    key: 'signin',
    value: function signin(username, password) {
      if (!username || !password) return false;
      return this.findOne('user', { username: username }).then(function (data) {
        var user = data;
        console.log(user, 9999);
        if (user && (0, _md2.default)(password) === user.password) {
          return {
            token: jwt.sign({
              _id: user._id }, _secret.userJWTCount) };
        } else {
          return false;
        }
      });
    }
  }, {
    key: 'signup',
    value: function signup(username, password) {
      return this.insertOne('user', { username: username, password: (0, _md2.default)(password) }).then(function (data) {
        return { token: jwt.sign({
            _id: data._id
          }, _secret.userJWTCount) };
      });
    }
  }]);

  return Model;
}();

function getModel(url) {
  url = 'mongodb://';
  if (username && password) {
    url = url + username + ':' + password + '@' + addr + ':' + port + '/' + instance;
  } else {
    url = url + addr + ':' + port + '/' + instance;
  }
  getModel[url] = getModel[url] || new Model(url);
  return getModel[url];
}