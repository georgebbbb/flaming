import should from 'should'
import _ from 'lodash'
import server from './server'
import {genUser, genMessage} from './util'
import {signup} from './base'
import fetch from 'supertest-as-promised'
import Promise from 'bluebird'


export const insert = Promise.promisify(function (message, auth, cb) {
  server
  .post("/user/db/mocha/collection/mocha")
  .set('authorization', auth)
  .send(message)
  .expect(200) // THis is HTTP response
  .end(cb);
})

describe("插入", () => {
  it("用户名注册后插入信息应该成功", (done) => {
    const message = genMessage()
    const user = genUser()
    signup(user)
    .then(res => insert(message, res.body.token))
    .then(res => {
      res.body.name.should.equal(message.name)
      done()
    })
  })

  it("没有登录插入应该会失败", (done) => {
    const message = genMessage()
    insert(message, null)
    .catch(()=> done())
  })
})
