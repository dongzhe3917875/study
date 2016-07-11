var mongodb = require('./db.js');

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
}

module.exports = User;

User.prototype.save = function(callback) {
  var user = {
      name: this.name,
      password: this.password,
      email: this.email
    }
    // mongodb.open 打开数据库 返回db
    // db.collection 获取指定数据库连接 返回collection
    // collection.insert 向指定数据库连接插入数据 返回user data
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }

      collection.insert(user, {
        safe: true
      }, function(err, user) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, user[0])
      })
    })
  })
}

User.get = function(name, callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }

    db.collection("users", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // 查找用户名name键值
      collection.findOne({
        name: name
      }, function(err, user) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, user)
      })
    })
  })
}
