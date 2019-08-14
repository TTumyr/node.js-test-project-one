const path = require('path');
const express = require('express');
const site = require('../controllers/site');

const router = express.Router();

router.get('/', site.home);
router.get('/login', site.login);
router.post('/login', site.login);
router.get('/register-user', site.registerUser);
router.post('/register-user', site.registerUser);

module.exports = router;
