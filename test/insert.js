import should from 'should'
import _ from 'lodash'
import server from './server'
import {genUser, genMessage} from './util'
import {signup} from './base'

describe("插入", () => {
  it("用户名注册后插入信息应该成功", (done) => {
    const message = genMessage()
    signup(genUser())
    .end((err,res) => {
      res.status.should.equal(200)
      server
      .post("/db/mocha/collection/mocha")
      .set('authorization', res.body.token)
      .send(message)
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function(err, res){
        res.status.should.equal(200);
        res.body.name.should.equal(message.name)
        done();
      });
    })
  })
})
