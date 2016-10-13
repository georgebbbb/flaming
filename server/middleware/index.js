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
  app.use('/db/:dbName',handleCommonReq)
  app.use(baseUrl, checkFindMethods)
  app.use('/db/:dbName/collection/', auth.unless({ method: 'GET' }));
  app.use(handleError)
}
