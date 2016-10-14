import should from 'should'
import _ from 'lodash'
import server from './server'
import {userCase, genUser} from './util'
import request from 'supertest-as-promised'
import Promise from 'bluebird'



export const signin = Promise.promisify(function(user, cb) {
   return server
  .post("/db/mocha/signin")
  .send(user)
  .expect("Content-type",/json/)
  .expect(200)
  .end(cb)
})

export const signup = Promise.promisify(function(user, cb) {
  return server
  .post("/db/mocha/signup")
  .send(user)
  .expect("Content-type",/json/)
  .expect(200)
  .end(cb)
})


// export function signup_signin(user, cb) {
//   signup(user)
//   .end((err,res) => {
//     signin(user).end(cb)
//   })
// }

describe("用户相关", () => {
  it("用户名注册应该能成功", (done) => {
    //每次测试此用户唯一
    signup(userCase)
    .then((res) => {
      res.status.should.equal(200)
      done()
    })
  })

  // it("用户名登陆应该能成功", (done) => {
  //   const user = genUser()
  //   signup_signin(user, (err,res) => {
  //     res.status.should.equal(200)
  //     done()
  //   })
  // })

  // it("没有该用户应该返回401", (done) => {
  //   signin(genUser())
  //   .then((err,res) => {
  //     res.status.should.equal(401)
  //     done()
  //   })
  // })
  //
  // it("密码错误应该返回401", (done) => {
  //   signin(genUser())
  //   .then((err, res) =>{
  //     res.status.should.equal(401)
  //     done()
  //   })
  // })
})
