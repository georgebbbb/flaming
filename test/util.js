import _ from 'lodash'

export function genString(){
  return Math.random().toString(36).substr(2, _.random(5,10))
}

//随机生成一个user
export function genUser(){
  return {
    username: genString(),
    password: genString()
  }
}

export function genMessage(){
  return {
    name: genString(),
    isOld: true,
    children: ['1','2'],
    time: new Date().valueOf(),
    other: {
      name: genString()
    },
    age: _.random(0, 50)
  }
}
