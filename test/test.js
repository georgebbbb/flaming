var supertest = require("supertest");
var should = require("should");
var _ = require("lodash")


// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:4000");

var s = ['ew','ad','df','ads','fads','dx']

// UNIT test begin
var item = {
  uid:1212,
  name:"wode",
  isOld:true,
  children:['1','2'],
  time:new Date().valueOf(),
  other:{
    name:s[_.random(0, 6)]
  },
  age: _.random(0, 50)
}
var updateItem = {
  time: new Date().valueOf(),
  other:{
    name: s[_.random(0, 6)]
  },
  age: _.random(0, 50)
}
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1N2E3M2JjZTk1NDY2MTBmN2I2NWRjOTMiLCJpYXQiOjE0NzA1Nzc2MTR9.mvrErMnIB3oPXSF6uypI_x0tP9XwTOLp8Fvzr2awe3Y'
// const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1N2FiMzMwZjg4NmJkMTYzYjVmNTRmZWEiLCJpYXQiOjE0NzA4NDA5OTR9.GI8m664q6F9kDNkzFUl24vhxU1EC1wcHTpfPnF4z6Os'
// describe("SAMPLE unit test",function(){
//
//   it("should return post db success",function(done){
//     // calling home page api
//     server
//     .post("/db/fuyin1/collection/user")
//     .set('authorization', token)
//     .set('api_authorization', apiToken)
//     .send(item)
//     .expect("Content-type",/json/)
//     .expect(200) // THis is HTTP response
//     .end(function(err,res){
//       res.status.should.equal(200);
//       done();
//     });
//   });
//
//   it("should return post success",function(done){
//     // calling home page api
//     server
//     .post("/db/mocha/collection/mocha")
//     .set('authorization',token)
//     .send(item)
//     .expect("Content-type",/json/)
//     .expect(200) // THis is HTTP response
//     .end(function(err,res){
//       res.status.should.equal(200);
//       done();
//     });
//   });
//
//
//   it("should return get success",function(done){
//     server
//     .get("/db/mocha/collection/mocha/57a401bcbe747b6429ae724e")
//     .set('authorization',token)
//     .expect("Content-type",/json/)
//     .expect(200) // THis is HTTP response
//     .end(function(err,res){
//       res.status.should.equal(200);
//       done();
//     });
//   });
//
//   it("should return get array success",function(done){
//     server
//     .get("/db/mocha/collection/mocha")
//     .expect("Content-type",/json/)
//     .set('authorization',token)
//     .expect(200) // THis is HTTP response
//     .end(function(err,res){
//       res.status.should.equal(200);
//       done();
//     });
//   });
//
//
//   it("should return updateById success",function(done){
//     server
//     .put("/db/mocha/collection/mocha/57a401bcbe747b6429ae724e")
//     .set('authorization',token)
//     .expect("Content-type",/json/)
//     .send(updateItem)
//     .expect(200) // THis is HTTP response
//     .end(function(err,res){
//       res.status.should.equal(200);
//       done();
//     });
//   });
//
//
//   it("should return update success",function(done){
//     server
//     .put("/db/mocha/collection/mocha")
//     .set('authorization',token)
//     .expect("Content-type",/json/)
//     .send(updateItem)
//     .set('x-db', JSON.stringify({
//       query: {
//         age: {
//           $lt: 15
//         }
//       }
//     }))
//     .expect(200) // THis is HTTP response
//     .end(function(err,res){
//       res.status.should.equal(200);
//       done();
//     });
//   });
//
//   it("should return deleteById success",function(done){
//     server
//     .delete("/db/mocha/collection/mocha/57aa83e584ec95f45ead0e71")
//     .set('authorization',token)
//     .expect("Content-type",/json/)
//     .expect(200) // THis is HTTP response
//     .end(function(err,res){
//       res.status.should.equal(200);
//       done();
//     });
//   });
//
//   it("should return delete success",function(done){
//     server
//     .delete("/db/mocha/collection/mocha")
//     .set('authorization',token)
//     .expect("Content-type",/json/)
//     .set('x-db', JSON.stringify({
//       query: {
//         age: 22
//       }
//     }))
//     .expect(200) // THis is HTTP response
//     .end(function(err,res){
//       res.status.should.equal(200);
//       done();
//     });
//   });
//
//
//   it("should limit sort methods run success",function(done){
//     server
//     .get("/db/mocha/collection/mocha")
//     .set('authorization',token)
//     .set('x-db', JSON.stringify({
//       methods: {
//         limit: 10,
//         sort: {username: 1}
//       }
//     }))
//     .expect("Content-type",/json/)
//     .expect(200) // THis is HTTP response
//     .end(function(err,res){
//       res.body.length.should.belowOrEqual(10)
//       if(res.body.length>=2){
//         res.body[0].age.should.belowOrEqual(res.body[1].age)
//       }
//       done();
//     });
//   });
// });
//
// //反向
// describe("SAMPLE unit test2",function(){
//   it("should wrong methods  return error",function(done){
//     server
//     .get("/db/mocha/collection/mocha")
//     .set('authorization',token)
//     .set('x-db', JSON.stringify({
//       methods: {
//         limit: 10,
//         sort1: {age: 1}
//       }
//     }))
//     .expect("Content-type",/json/)
//     .expect(200) // THis is HTTP response
//     .end(function(err,res){
//       res.status.should.equal(500);
//       res.body.should.deepEqual({
//         error: ['sort1'].join(',')+"error"
//       })
//       done();
//     });
//   });
// })
//
// //测query
// describe("test query",function(){
//   it("基础query应该好使",function(done){
//     server
//     .get("/db/mocha/collection/mocha")
//     .set('authorization',token)
//     .set('x-db', JSON.stringify({
//       query: {
//         age: 1
//       }
//     }))
//     .expect("Content-type",/json/)
//     .expect(200) // THis is HTTP response
//     .end(function(err,res){
//       res.status.should.equal(200);
//       done();
//     });
//   });
//
//   it("$gt 应该好使",function(done){
//     server
//     .get("/db/mocha/collection/mocha")
//     .set('authorization',token)
//     .set('x-db', JSON.stringify({
//       query: {
//         age: {
//           $gt: 45
//         }
//       }
//     }))
//     .expect("Content-type",/json/)
//     .expect(200) // THis is HTTP response
//     .end(function(err,res){
//       res.status.should.equal(200);
//       done();
//     });
//   });
//
//   it("$in 应该好使",function(done){
//     server
//     .get("/db/mocha/collection/mocha")
//     .set('authorization',token)
//     .set('x-db', JSON.stringify({
//       query: {
//         'other.name':{
//           $in: ['fads','df']
//         }
//       }
//     }))
//     .expect("Content-type",/json/)
//     .expect(200) // THis is HTTP response
//     .end(function(err,res){
//       res.status.should.equal(200);
//       done();
//     });
//   });
//
//   it("$or 应该好使",function(done){
//     server
//     .get("/db/mocha/collection/mocha")
//     .set('authorization',token)
//     .set('x-db', JSON.stringify({
//       query: {
//         $or:[{'other.name': 'dx'},{age: {$lt: 10}}]
//       }
//     }))
//     .expect("Content-type",/json/)
//     .expect(200) // THis is HTTP response
//     .end(function(err,res){
//       res.status.should.equal(200);
//
//       done();
//     });
//   });
//
//   it("如果查询不到应该返回[]",function(done){
//     server
//     .get("/db/mocha/collection/mocha")
//     .set('authorization',token)
//     .set('x-db', JSON.stringify({
//       query: {
//         age: {
//           $gt: 51
//         }
//       }
//     }))
//     .expect("Content-type",/json/)
//     .expect(200) // THis is HTTP response
//     .end(function(err,res){
//       res.status.should.equal(200);
//       res.body.should.deepEqual([])
//       done();
//     });
//   });
// })

describe("用户相关",function(){
  it("用用户名注册应该能成功", function(done){
    server
    .post("/db/mocha/signup")
    .send({
      username: "georgebbbb"+_.random(0,1000000),
      password: "3263693"
    })
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  })



  it("用用户名登陆应该能成功", function(done){
    const user = {
      username: "georgebbbb"+_.random(0,1000000),
      password: "3263693"
    }

    server
    .post("/db/mocha/signup")
    .send(user)
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      server
      .post("/db/mocha/signin")
      .send(user)
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        console.log(res.status);
        res.status.should.equal(200);
        done();
      });
    });
  })


  it("没有该用户应该返回401", function(done){
    server
    .post("/db/mocha/signin")
    .send({
      username: "georgebbbb"+_.random(0,1000000),
      password: "3263693"
    })
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      console.log(res.status);
      res.status.should.equal(401);
      done();
    });
  })

  it("密码错误应该返回401", function(done){
    server
    .post("/db/mocha/signin")
    .send({
      username: "georgebbbb"+_.random(0,1000000),
      password: "326361293"
    })
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      console.log(res.status);
      res.status.should.equal(401);
      done();
    });
  })
})
