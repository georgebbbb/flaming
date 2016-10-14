import should from 'should'
import _ from 'lodash'
import server from './server'
import {genUser, genMessage} from './util'
import { signup, signin } from './base'
import { insert } from './insert'
import Promise from 'bluebird'

const userCase = genUser()


export const findById = Promise.promisify(function(id, cb) {
  server
  .get(`/db/mocha/collection/mocha/${ id }`)
  .expect("Content-type", /json/)
  .expect(200) // THis is HTTP response
  .end(cb);
})

export const findByUser = Promise.promisify(function (auth, cb) {
  server
  .get(`/user/db/mocha/collection/mocha`)
  .set('authorization', auth)
  .expect("Content-type", /json/)
  .expect(200) // THis is HTTP response
  .end(cb);
})

describe("查找", () => {
  it("用户名注册后插入信息然后在查找应该会有", (done) => {
    const message = genMessage()
    signup(userCase)
    .then(res => insert(message, res.body.token))
    .then(res => findById(res.body._id))
    .then(res => {
      res.body.name.should.equal(message.name)
      done()
    })
  })

  it("根据用户能查到属于此用户的信息", (done) => {
    const message = genMessage()
    signin(userCase)
    .then(res => {
      return insert(message, res.body.token)
      .then(insertRes => findByUser(res.body.token))
    })
    .then(res => {
      done()
    })
  })
})
