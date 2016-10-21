import jwt from 'express-jwt'
import _ from 'lodash'

import {
  userJWTCount
} from '../consts/secret'

//检查传过来的函数名是否正确
export function checkFindMethods(req, res, next) {
  let {methods} = req.db
  if(methods) {
    methods = _.keys(methods).filter((method) => ['limit', 'sort'].indexOf(method) === -1)
    if(methods.length > 0){
      res.status(500).json({ error: methods.join(',')+"error" })
      return
    }
  }
  next()
}

//统一处理请求参数包括 dbname collection
export function handleCommonReq(req, res, next) {
  const db = {
    dbName: req.params.dbName,
    collectionName: req.params.collectionName||"books",
    url: `mongodb://localhost:27017/${req.params.dbName}`
  }
  const header = req.headers["x-db"]
  if(header){
    const {query, methods} = JSON.parse(header)
    db.query = query
    db.methods = methods
  }
  _.set(req, 'db', db)
  next()
}

//处理错误
export function handleError(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }else {
    console.log(err);
  }
}
//checkApiToken
export function checkApiToken(req, res, next) {
  // jwt({
  //   secret: (req) => {
  //     console.log(`${userJWTCount}${req.params.dbName}`)
  //     return `${userJWTCount}${req.params.dbName}`
  //   },
  //   credentialsRequired: true,
  //   getToken: (req) => req.headers.api_authorization
  // })
}
//处理authtoken
export function handleAuthToken(req, res, next) {
  jwt({
    secret: userJWTCount,
    credentialsRequired: true,
    getToken: (req) => req.headers.authorization
  })
  next()
}
