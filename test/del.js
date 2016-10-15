import should from 'should'
import _ from 'lodash'
import server from './server'
import { genUser, genMessage } from './util'
import { signup, signin } from './base'
import { insert } from './insert'
import { findByUser } from './find'
import Promise from 'bluebird'

export const del = Promise.promisify(function(id, auth, cb) {
  server
  .delete(`/user/db/mocha/collection/mocha/${id}`)
  .set('authorization', auth)
  .expect(200) // THis is HTTP response
  .end(cb);
})


describe("删除", () => {
  const userCase = genUser()

  it("用户名注册后插入信息然后可以删除", (done) => {
    const message = genMessage()
    let token = null
    signup(userCase)
    .then(res => {
      token = res.body.token
      return insert(message, token)
    })
    .then(insertRes => findByUser(token))
    .then(res => {
      res.body.length.should.equal(1)
      return del(res.body[0]._id, token)
    })
    .then(res => findByUser(token))
    .then(res => {
      res.body.length.should.equal(0)
      done()
    })
  })
})
