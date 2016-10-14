import should from 'should'
import _ from 'lodash'
import server from './server'
import {genUser, genMessage} from './util'
import {signup} from './base'
import fetch from 'supertest-as-promised'
import {promisify} from 'bluebird'

export function signup_insert(message, cb) {
  signup(genUser())
  .end((err,res) => {
    res.status.should.equal(200)
    server
    .post("/user/db/mocha/collection/mocha")
    .set('authorization', res.body.token)
    .send(message)
    .expect("Content-type", /json/)
    .expect(200) // THis is HTTP response
    .end(cb);
  })
}


function insert(message, auth, cb) {
  server
  .post("/user/db/mocha/collection/mocha")
  .set('authorization', auth)
  .send(message)
  .expect("Content-type", /json/)
  .expect(200) // THis is HTTP response
  .end(cb);
}

describe("插入", () => {
  it("用户名注册后插入信息应该成功", (done) => {
    const message = genMessage()
    signup_insert(message, (err, res) => {
      res.status.should.equal(200);
      res.body.name.should.equal(message.name)
      done();
    })
  })

  it("没有登录插入应该会失败", (done) => {
    const message = genMessage()
    insert(message, null, (err, res) => {
      res.status.should.equal(401);
      done();
    })
  })
})
