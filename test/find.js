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
export const find = Promise.promisify(function(query, methods, cb) {
  server
  .get(`/db/mocha/collection/mocha`)
  .set('x-db', JSON.stringify({
    query, methods
  }))
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

describe("用户相关查找", () => {
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

describe('无鉴权查找', () => {
  it('基本的无条件查找会成功', done => {
    find(null, null)
    .then(res => done())
  })

  it('测$lt会成功', done => {
    find({
      age: {
        $lt: 5
      }
    }, null)
    .then(res => done())
  })

  it('如果查询不到应该返回[]', done => {
    find({
      age: {
        $lt: -1
      }
    }, null)
    .then(res => {
      res.status.should.equal(200);
      res.body.should.deepEqual([])
      done();
    })
  })

  it('测limit会成功', done => {
    find(null, {limit: 3})
    .then(res => {
      res.body.length.should.equal(3)
      done()
    })
  })
})
