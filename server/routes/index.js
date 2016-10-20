import {
  baseUrl, signin, signup
} from '../url/index'

import getModel from '../model/index'

export default function routes(app){
  app.post('/user'+baseUrl, (req, res) => {
    const {url} = req.db
    const {collectionName} = req.params
    const {body} = req
    body.userId = req.user._id
    getModel(url).insertOne(collectionName, req.body)
    .then( data => res.json(data))
    .catch( err => console.log(err))
  })

  app.post(baseUrl, (req, res) => {
    console.log(1)
    const {url} = req.db
    const {collectionName} = req.params
    const {body} = req
    getModel(url).insertOne(collectionName, req.body)
    .then( data => res.json(data))
    .catch( err => console.log(err))
  })


  app.get(`${baseUrl}/:id`, (req, res) => {
    const {url} = req.db
    const {id, collectionName} = req.params
    getModel(url)
    .findById(collectionName, id)
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(error)
    })
  })

  app.get('/user' + baseUrl, (req, res) => {
    const {url, methods} = req.db
    const {collectionName} = req.params
    const query = req.db.query || {
      userId: req.user._id
    }
    getModel(url).find(collectionName, query, methods)
    .then((data) => res.json(data))
    .catch((err) => console.log(err))
  })

  app.get(baseUrl, (req, res) => {
    console.log(baseUrl)
    const {url, query, methods} = req.db
    const {collectionName} = req.params
    getModel(url).find(collectionName, query, methods)
    .then((data) => res.json(data))
    .catch((err) => console.log(err))
  })


  app.put('/user'+`${baseUrl}/:id`, (req, res) => {
    const {url} = req.db
    const {id, collectionName} = req.params
    getModel(url)
    .updateById(collectionName, id, req.body)
    .then((data) => res.json(data))
    .catch((err) => console.log(error))
  })

  // app.put(baseUrl, (req, res) => {
  //   const {url, query, methods} = req.db
  //   const {collectionName} = req.params
  //   getModel(url).update(collectionName, query, req.body)
  //   .then((data) => res.json(data))
  //   .catch((err) => console.log(err))
  // })

  app.delete('/user'+`${baseUrl}/:id`, (req, res) => {
    console.log(87611)
    const {url} = req.db
    const {id, collectionName} = req.params
    getModel(url)
    .removeById(collectionName, id)
    .then((data) => res.json(data))
    .catch((err) => console.log(error))
  })

  // app.delete(baseUrl, (req, res) => {
  //   const {url, query, methods} = req.db
  //   const {collectionName} = req.params
  //   getModel(url).remove(collectionName, query, req.body)
  //   .then((data) => res.json(data))
  //   .catch((err) => console.log(err))
  // })
  //登录
  app.post(signin, (req, res) => {
    const {username, password} = req.body
    getModel(req.db.url)
    .signin(username, password)
    .then((data) => {
      if(data){
        res.json(data)
      }else {
        res.status(401).send('username,password error...');
      }
    })
    .catch((error) => console.log(error))
  })
  //注册
  app.post(signup, (req, res) => {
    const {username, password} = req.body
    getModel(req.db.url)
    .signup(username, password)
    .then((data) =>{
      return data
    })
    .then((data) => res.json(data))
    .catch((error) => console.log(error))
  })

}
