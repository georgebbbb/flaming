import should from 'should'
import _ from 'lodash'
import server from './server'
import {genUser} from './util'
import request from 'supertest-as-promised'

export function signin(user){
   return server
  .post("/db/mocha/signin")
  .send(user)
  .expect("Content-type",/json/)
  .expect(200)
}

export function signup(user){
  return server
  .post("/db/mocha/signup")
  .send(user)
  .expect("Content-type",/json/)
  .expect(200)
}

export function signin_signup(user, cb) {
  signup(user)
  .end((err,res) => {
    signin(user).end(cb)
  })
}

describe("用户相关", () => {
  it("用户名注册应该能成功", (done) => {
    signup(genUser())
    .then((res) => {
      res.status.should.equal(200)
      done()
    })
  })

  it("用户名登陆应该能成功", (done) => {
    const user = genUser()
    signin_signup(user, (err,res) => {
      res.status.should.equal(200)
      done()
    })
  })

  it("没有该用户应该返回401", (done) => {
    signin(genUser())
    .end((err,res) => {
      res.status.should.equal(401)
      done()
    })
  })

  it("密码错误应该返回401", (done) => {
    signin(genUser())
    .end((err, res) =>{
      res.status.should.equal(401)
      done()
    })
  })
})
