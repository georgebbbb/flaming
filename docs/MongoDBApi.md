# MongoDB

## shell

```shell
mongod --dbpath=/path/mongodb

use myNewDatabase
db.myCollection.insert( { x: 1 } )

db["3test"].find()

db.getCollection("3test").find()

```