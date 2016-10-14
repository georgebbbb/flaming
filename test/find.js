import should from 'should'
import _ from 'lodash'
import server from './server'
import {genUser, genMessage} from './util'
import {signup} from './base'
import {signup_insert} from './insert'


export function signup_insert_findById(message, cb) {
  signup_insert(message, (err, res) => {
    const { _id } = res.body
    server
    .get(`/db/mocha/collection/mocha/${ _id }`)
    .expect("Content-type", /json/)
    .expect(200) // THis is HTTP response
    .end(cb);
  })
}

describe("查找", () => {
  it("用户名注册后插入信息然后在查找应该会有", (done) => {
    const message = genMessage()
    signup_insert_findById(message, (err, res) => {
      res.status.should.equal(200);
      res.body.name.should.equal(message.name)
      done();
    })
  })
})
