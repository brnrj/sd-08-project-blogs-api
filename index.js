const express = require('express');

const {
  usersController: {
    userCreate,
  },
} = require('./controlers');

const {
  registerMiddlewares: {
    validateName,
    validateEmail,
    validatePassword,
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

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
