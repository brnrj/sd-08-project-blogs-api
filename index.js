const express = require('express');
const {
  UserController,
  LoginController,
  CategoryController,
  BlogPostController,
} = require('./controllers');
const { ErrorsLogin } = require('./schemas');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', UserController);
app.use('/login', ErrorsLogin, LoginController);
app.use('/categories', CategoryController);
app.use('/post', BlogPostController);

app.listen(PORT, () => console.log('ouvindo porta 3000!'));
