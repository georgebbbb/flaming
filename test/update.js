import should from 'should'
import _ from 'lodash'
import server from './server'
import {genUser, genMessage} from './util'
import {signup} from './base'
import { insert } from './insert'
import { findById } from './find'
import fetch from 'supertest-as-promised'
import Promise from 'bluebird'

const userCase = genUser()

export const update = Promise.promisify(function (message, auth, cb) {
  server
  .put("/user/db/mocha/collection/mocha")
  .set('authorization', auth)
  .send(message)
  .expect(200) // THis is HTTP response
  .end(cb);
})

describe("用户相关更新", () => {
  it("用户名注册后插入信息然后在查找应该会有", (done) => {
    const message = genMessage()
    signup(userCase)
    .then(res => {
      insert(message, res.body.token)
      .then(insertRes => {
        console.log(111);
        insertRes.body.name = "999"
        update(insertRes.body, res.body.token)
        .then( updateRes => {
          console.log(updateRes.body);
          done()

        })
      })


    })

    // .then(res =>
    // .then(res => {
    //
    //
    //   res.body.name.should.equal(message.name)
    //   done()
    // })
  })
})

// 比如说拿到的是
//
// var a ＝ {
//   _id: 1123121
//   name: 88888
// }
//
// 直接  a.name = 777
// 然后 put 就好
