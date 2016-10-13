# flaming

## 目录

server 后台文件
test 后台测试文件
admin 申请账号，权限管理后台
client 前端封装API

```
npm intsall
npm install -g nodemon
npm install -g mocha
npm run dev

mongod --dbpath=/path/mongodb
```


#基本思想
 user 和 其他逻辑是分开的，
 user 特殊处理，提供注册和登录的接口
 其他逻辑统一处理，增删改查，其中，除了查，其他操作都需要鉴权，也就是说都需要知道是哪个user改的，user 只能改自己的
