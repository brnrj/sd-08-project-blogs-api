const express = require('express');
const middlewares = require('../middlewares');

const router = express.Router();

const user = require('./user');
const categories = require('./categories');
const post = require('./post');
const login = require('../controllers/login');

router.use('/user', user);

router.use('/categories', categories);

router.use('/post', post);

router.post('/login', login);

router.use(middlewares.error);

module.exports = router;
