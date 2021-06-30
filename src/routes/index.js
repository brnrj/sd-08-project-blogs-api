const express = require('express');
const user = require('./user');
const login = require('./login');
const categories = require('./categories');
const posts = require('./posts');

const router = express.Router();

router.use('/login', login);

router.use('/user', user);
 
router.use('/categories', categories);

router.use('/post', posts);

module.exports = router;
