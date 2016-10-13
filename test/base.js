import should from 'should'
import _ from 'lodash'
import server from './server'
import {genUser} from './util'


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

describe("用户相关", () => {
  it("用户名注册应该能成功", (done) => {
    signup(genUser())
    .end((err,res) => {
      res.status.should.equal(200)
      done()
    })
  })

  it("用户名登陆应该能成功", (done) => {
    const user = genUser()
    signup(user)
    .end((err,res) => {
      signin(user)
      .end((err,res) => {
        console.log(res.body.token);
        res.status.should.equal(200)
        done()
      })
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
