const express = require('express');
const RouterUser = require('./src/router/user/router');
const RouterCategories = require('./src/router/categories/router');
const RouterBlogPost = require('./src/router/blogPost/router');
const error = require('./src/middlewares/error');

const app = express();
app.use(express.json());

app.use('/', RouterUser);
app.use('/', RouterCategories);
app.use('/', RouterBlogPost);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(error);
