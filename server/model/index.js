import Promise from 'bluebird'
import {ObjectId} from 'mongodb'
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
import md5 from 'md5'
import _ from 'lodash'
const MongoClient = Promise.promisifyAll(require("mongodb").MongoClient);

import { decorateData } from '../../common/utils'
import {
  apiJWTCount, userJWTCount
} from '../consts/secret'

var port = process.env.MONGODB_PORT_27017_TCP_PORT||'27017';
var addr = process.env.MONGODB_PORT_27017_TCP_ADDR||'localhost';
var instance = process.env.MONGODB_INSTANCE_NAME||'docker';
var password = process.env.MONGODB_PASSWORD
var username = process.env.MONGODB_USERNAME
var url = 'mongodb://'
if(username && password){
  url =  url + username + ':' + password +'@' + addr + ':' + port + '/' + instance
}else {
  url = url + addr + ':' + port + '/' + instance
}

class Model {
  constructor(){
    console.log(url);
    this.connect  = MongoClient.connect(url)
  }
  insert(collectionName, fileds={}, methods={}){
    return this.connect.then((db)=> {
      return db.collection(collectionName).insert(fileds).then( (result)=>{
          //Todo: result.insertedIds
          //返回修改后的数据
      })
    })
  }
  insertOne(collectionName, fileds={}, methods={}){
    return this.connect.then((db)=> {
        return db.collection(collectionName).insertOne(fileds).then( (result)=>{
          return this.findById(collectionName, result.insertedId)
        })
      })
  }
  findOne(collectionName, query={}, methods={}){
    return this.connect
    .then((db)=> db.collection(collectionName).findOne(query))
  }
  findById(collectionName, id){
    return this.findOne(collectionName, {'_id': new ObjectId(id)})
  }
  find(collectionName, query={}, methods={}){
    return this.connect
    .then((db) => db.collection(collectionName).find(query))
    .then((data) => decorateData(data, methods))
  }
  updateOne(collectionName, query={}, fileds={}, methods={}){
    return this.connect
    .then(db=> db.collection(collectionName).updateOne(query, fileds))
  }
  updateById(collectionName, id='', fileds={}, methods={}){
    return this.updateOne(collectionName, {'_id': new ObjectId(id)}, fileds, methods)
  }
  update(collectionName, query={}, fileds={}, methods={}){
    return this.connect
    .then((db) => db.collection(collectionName).update(query, fileds))
  }
  removeOne(collectionName, query={}){
    return this.connect
    .then(db=> db.collection(collectionName).removeOne(query))
  }
  removeById(collectionName, id=''){
    return this.removeOne(collectionName, {'_id': new ObjectId(id)})
  }
  remove(collectionName, query={}){
    return this.connect
    .then((db) => db.collection(collectionName).remove(query))
  }
  signdev(username, dbname) {
    if(!username || !dbname) return false
    return this.findOne('user', {username: username})
    .then((user) => {
      console.log(user,11119);
      console.log(jwt.sign({_id: user._id}, `${apiJWTCount}${dbname}`));
      if(user){
        return {
          token: jwt.sign({_id: user._id}, `${apiJWTCount}${dbname}`)
        }
      }else {
        return false
      }
    })
  }
  signin(username, password){
    if(!username || !password) return false
    return this.findOne('user', {username:username})
    .then((data) => {
      const user = data
      console.log(user,9999);
      if(user && md5(password) === user.password){
        return {
          token: jwt.sign({
            _id: user._id}, userJWTCount
        )}
      }else {
        return false
      }
    })
  }
  signup(username, password){
    return this.insertOne('user', {username: username, password: md5(password)})
    .then((data) => ({token: jwt.sign({
      _id: data._id
    }, userJWTCount)}))
  }
}

export default function getModel(url){
  getModel[url] = getModel[url] || new Model(url)
  return getModel[url]
}
