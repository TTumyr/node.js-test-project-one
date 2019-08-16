const bcrypt = require('bcrypt');
const sanitize = require('sanitize-html');
const validator = require('validator');
const mdb = require('../utils/mdb');
const settings = require('../utils/settings');
const system = settings.system();

exports.home = (req, res, next) => {
  mdb.db
    .collection(system.mdb.col.users)
    .find()
    .toArray((err, users) => {
      res.render('index.ejs', { users, system, pgTitle: 'nodejs', path: '/' });
    });
};

exports.login = (req, res, next) => {
  if (req.method === 'GET') {
    res.render('login.ejs', { system, pgTitle: 'login', path: '/login' });
  } else if (req.method === 'POST') {
    console.log('Add login logic here');
    res.end('No login logic added yet.\n<a href="/login">back</a>');
  }
};

exports.registerUser = (req, res, next) => {
  if (req.method === 'GET') {
    res.render('register_user.ejs', {
      system,
      pgTitle: 'register',
      path: '/register-user'
    });
  } else if (req.method === 'POST') {
    if (req.password === req.passwordR) {
      let salt = bcrypt.genSaltSync(10);
      let password = bcrypt.hashSync(req.body.password, salt);
      cleanUsername = sanitize(req.body.username, {
        allowedTags: [],
        allowedAttributes: [],
        allowedIframeHostnames: []
      });
      cleanUsername.trim();
      if (!validator.isAlphanumeric(cleanUsername)) {
        res.end('Username not accepted');
      } else if (!validator.isEmail(req.body.email)) {
        res.end('Not a valid email address');
      } else if (cleanUsername !== '') {
        mdb.db
          .collection(system.mdb.col.users)
          .insertOne({
            username: cleanUsername,
            email: req.body.email,
            password: password,
            registered: new Date()
          })
          .then(data => {
            console.log(data);
          })
          .then(() => {
            res.redirect('/');
          });
      } else {
        res.end('Something went wrong');
      }
    } else {
      res.end('No register possible yet.\n<a href="/register-user">back</a>');
    }
  }
};
