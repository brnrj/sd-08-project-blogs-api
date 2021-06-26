const express = require('express');
const user = require('./user');
const posts = require('./posts');

const router = express();

router.route('/user')
  .post(user);

router.route('/post')
  .post(posts);

module.exports = router;
