const express = require('express');
const user = require('./user');
const login = require('./login');
const posts = require('./posts');

const router = express.Router();

router.use('/user', user);

router.route('/login')
 .post(login);

router.route('/post')
  .post(posts);

module.exports = router;
