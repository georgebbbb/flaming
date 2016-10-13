## API

### 权限

```json
headers: {
  "dev-token": '',
  "user-token": '',
  "x-db": ''
}
```

### 操作数据

```json
headers: {
  "x-db": ''
}
```

### 增删改查

insert
delete
update
find



版本 1: `consts/`里面配置`API`开发`Token` (单个应用部署)
版本 2: 用户通过后台Admin申请`API`开发`Token`，由后台动态生成 (云服务)

