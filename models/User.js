const bcrypt = require('bcrypt');
const sanitize = require('sanitize-html');
const validator = require('validator');
const settings = require('../utils/settings');
const system = settings.system();
const user = require('../utils/mdb').db.collection(system.mdb.col.users);

let User = function(data, getAvatar) {
  this.data = data;
  this.errors = [];
  if (getAvatar === undefined) {
    getAvatar = false;
  }
  if (getAvatar) {
    this.getAvatar();
  }
};

User.prototype.findAll = function() {
  return new Promise(async (resolve, reject) => {
    user.find().toArray((err, users) => {
      resolve(users);
    });
  });
};
User.prototype.register = function() {
  return new Promise(async (resolve, reject) => {
    if (this.data.password === this.data.passwordR) {
      let salt = bcrypt.genSaltSync(10);
      let password = bcrypt.hashSync(this.data.password, salt);
      cleanUsername = sanitize(this.data.username, {
        allowedTags: [],
        allowedAttributes: [],
        allowedIframeHostnames: []
      });
      cleanUsername.trim();
      if (!validator.isAlphanumeric(cleanUsername)) {
        res.end('Username not accepted');
      } else if (!validator.isEmail(this.data.email)) {
        res.end('Not a valid email address');
      } else if (cleanUsername !== '') {
        user
          .insertOne({
            username: cleanUsername,
            email: this.data.email,
            password: password,
            registered: new Date()
          })
          .then(reg => {
            console.log(reg);
          })
          .then(() => {
            resolve();
          });
      } else {
        res.end('Something went wrong');
      }
    } else {
      res.end('No register possible yet.\n<a href="/register-user">back</a>');
    }
  });
};

module.exports = User;
