import should from 'should'
import _ from 'lodash'
import server from './server'
import {genUser, genMessage} from './util'
import {signup} from './base'
import {insert} from './insert'


export function findById(message, cb) {
  insert(message, (err, res) => {
    const { _id } = res.body
    server
    .get(`/db/mocha/collection/mocha/${ _id }`)
    // .set('authorization', res.body.token)
    .expect("Content-type", /json/)
    .expect(200) // THis is HTTP response
    .end(cb);
  })
}


describe("查找", () => {
  it("用户名注册后插入信息然后在查找应该会有", (done) => {
    const message = genMessage()
    findById(message, (err, res) => {
      res.status.should.equal(200);
      console.log(res.body._id)
      res.body.name.should.equal(message.name)
      done();
    })
  })
})
