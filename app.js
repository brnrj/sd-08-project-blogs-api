const express = require('express');
const { errorHandler, notFoundHandler } = require('./middlewares');
const { Users, Categories, BlogPosts } = require('./routes');
const { resources } = require('./.env');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(`/${resources.Users.basePath}`, Users);
app.use(`/${resources.Categories.basePath}`, Categories);
app.use(`/${resources.BlogPosts.basePath}`, BlogPosts);

app.use('/:notFound', notFoundHandler);
app.use(errorHandler);

module.exports = app;
