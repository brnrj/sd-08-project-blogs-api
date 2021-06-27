const express = require('express');

const {
  usersController: {
    userCreate,
  },
  loginController: {
    makeLogin,
  },
} = require('./controlers');

const {
  registerMiddlewares: {
    validateName,
    validateEmail,
    validatePassword,
  },
  loginMiddlewares: {
    validateEmailLogin,
    validatePasswordLogin,
  },
} = require('./middlewares');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// Rotas /user
app.post('/user',
  validateName,
  validateEmail,
  validatePassword,
  userCreate);

app.post('/login',
  validateEmailLogin,
  validatePasswordLogin,
  makeLogin);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
