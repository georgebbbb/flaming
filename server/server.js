import {mongodbClient, ObjectId} from 'mongodb'
import express from 'express'
import {urlencoded, json} from 'body-parser'
import _ from 'lodash'
import routes from './routes/index'
import middleware from './middleware/index'

const app = express()

app.use(urlencoded({ extended: false }))
app.use(json())

// 中间件
middleware(app)
// 路由
routes(app)

app.listen(4000)
