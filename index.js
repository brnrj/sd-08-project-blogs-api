const express = require('express');

const {
  usersController: {
    userCreate,
    getUsers,
    getUsersById,
    deleteUserById,
  },
  loginController: {
    makeLogin,
  },
  categoriesController: {
    categoryCreate,
    getCategories,
  },
  postsController: {
    postCreate,
    getPosts,
    getPostsById,
    putPostsById,
    deletePostsById,
  },
} = require('./controlers');

const {
  registerMiddlewares: {
    validateName,
    validateEmail,
    validatePassword,
    validateToken,
  },
  blogPostMiddlewares: {
    validateTitle,
    validateContent,
    validateCategoryIds,
  },
} = require('./middlewares');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user',
  validateName,
  validateEmail,
  validatePassword,
  userCreate);

app.get('/user', validateToken, getUsers);

app.get('/user/:id', validateToken, getUsersById);

app.delete('/user/me', validateToken, deleteUserById);

app.post('/login',
  validateEmail,
  validatePassword,
  makeLogin);

app.post('/categories', validateToken, categoryCreate);

app.get('/categories', validateToken, getCategories);

app.post('/post',
  validateTitle,
  validateContent,
  validateCategoryIds,
  validateToken,
  postCreate);

app.get('/post',
  validateToken,
  getPosts);

app.get('/post/:id',
  validateToken,
  getPostsById);

app.put('/post/:id',
  validateToken,
  validateTitle,
  validateContent,
  putPostsById);

app.delete('/post/:id',
  validateToken,
  deletePostsById);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
