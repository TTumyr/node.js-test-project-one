const path = require('path');
const express = require('express');
const site = require('../controllers/site');

const router = express.Router();

router.get('/', site.home);

module.exports = router;
