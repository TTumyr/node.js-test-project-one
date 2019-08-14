const mdb = require('../utils/mdb');
const settings = require('../utils/settings');
const system = settings.system();

exports.home = (req, res, next) => {
  mdb.query.operation = 'find';
  mdb.query.collection = 'data1';
  mdb.db
    .collection(mdb.query.collection)
    .find()
    .toArray((err, items) => {
      res.render('index.ejs', { items, system, pgTitle: 'nodejs', path: '/' });
    });
};

exports.login = (req, res, next) => {
  if (req.method === 'GET') {
    res.render('login.ejs', { system, pgTitle: 'login', path: '/login' });
  } else if (req.method === 'POST') {
    console.log('Add login logic here');
    res.send('No login logic added yet.\n<a href="/login">back</a>');
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
    console.log('Add logic here');
    res.send('No register possible yet.\n<a href="/register-user">back</a>');
  }
};
