import {
  checkFindMethods, handleCommonReq, handleError,
  handleAuthToken, checkApiToken
} from './func'
import unless from 'express-unless'

import { userJWTCount } from '../consts/secret'
import jwt from 'express-jwt'

import {
  baseUrl
} from '../url'

const auth = jwt({
  secret: userJWTCount,
  credentialsRequired: true,
  getToken: (req) => req.headers.authorization
})
auth.unless = unless

export default function middleware(app){
  // app.use('/db/:dbName/collection/', checkApiToken);
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })
  app.use('/db/:dbName',handleCommonReq)
  app.use('/user/db/:dbName',handleCommonReq)
  app.use(baseUrl, checkFindMethods)
  app.use('/user'+baseUrl, checkFindMethods)
  app.use('/user/db/:dbName/collection/', auth);
  app.use(handleError)
}
