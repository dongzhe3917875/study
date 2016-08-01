var mongodb = require("./db.js");
var markdown = require("markdown").markdown;

function Post(name, title, subject, post) {
  this.name = name;
  this.title = title;
  this.post = post;
  this.subject = subject;
}

module.exports = Post;

Post.prototype.save = function(callback) {
  var date = new Date();
  var time = {
    date: date,
    year: date.getFullYear(),
    month: date.getFullYear() + "-" + (date.getMonth() + 1),
    day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
      date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() <
        10 ? '0' + date.getMinutes() : date.getMinutes())
  }

  var post = {
    name: this.name,
    time: time,
    title: this.title,
    subject: this.subject,
    post: this.post
  }

  mongodb.open(function(err, db) {
    if (err) {
      return callback(err)
    }
    db.collection("posts", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.insert(post, {
        safe: true
      }, function(err) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
        mongodb.close();
      });
    });
  });
}

Post.getAll = function(name, callback) {

  mongodb.open(function(err, db) {
    if (err) {
      return callback(err)
    }
    db.collection("posts", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var query = {};
      if (name) {
        query.name = name;
      }
      collection.find(query).sort({
        time: -1
      }).toArray(function(err, docs) {
        mongodb.close();
        if (err) {
          return callback(err);
        }

        //支持markdown
        // console.log(JSON.stringify(markdown))
        // docs.forEach(function(ele) {
        //   ele.post = markdown.toHTML(ele.post);
        // })
        callback(null, docs);
        mongodb.close();
      })
    });
  });
}


Post.getOne = function(name, day, title, callback) {

  mongodb.open(function(err, db) {
    if (err) {
      return callback(err)
    }
    db.collection("posts", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      console.log(name, day, title)
      collection.findOne({
        name: name,
        "time.day": day,
        title: title
      }, function(err, doc) {
        if (err) {
          return callback(err);
        }
        callback(null, doc);
        mongodb.close();
      })
    });
  });
}
