import {
  checkFindMethods, handleCommonReq, handleError,
  handleAuthToken, checkApiToken
} from './func'

import {
  baseUrl
} from '../url'

export default function middleware(app){
  // app.use('/db/:dbName/collection/', checkApiToken);
  app.use('/db/:dbName',handleCommonReq)
  app.use(baseUrl, checkFindMethods)
  app.use('/db/:dbName/collection/', handleAuthToken)
  app.use(handleError)
}