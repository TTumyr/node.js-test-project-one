const settings = require('../utils/settings');
const system = settings.system();
const User = require('../models/User');

exports.home = async (req, res, next) => {
  let user = new User(req.body);
  const users = await user.findAll();
  res.render('index.ejs', { users, system, pgTitle: 'nodejs', path: '/' });
};

exports.login = (req, res, next) => {
  if (req.method === 'GET') {
    res.render('login.ejs', { system, pgTitle: 'login', path: '/login' });
  } else if (req.method === 'POST') {
    console.log('Add login logic here');
    res.end('No login logic added yet.\n<a href="/login">back</a>');
  }
};

exports.registerUser = async (req, res, next) => {
  if (req.method === 'GET') {
    res.render('register_user.ejs', {
      system,
      pgTitle: 'register',
      path: '/register-user'
    });
  } else if (req.method === 'POST') {
    let user = new User(req.body);
    await user.register();
    res.redirect('/');
  }
};
