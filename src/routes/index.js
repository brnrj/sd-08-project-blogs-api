const express = require('express');

const user = require('./user');
const posts = require('./posts');

const route = express();

route.use('/user', user);
route.use('/post', posts);

module.exports = route;
