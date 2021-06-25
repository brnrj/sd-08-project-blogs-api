const express = require('express');
const bodyParser = require('body-parser');

const validEmail = require('./middlewares/validEmail');
const validPassword = require('./middlewares/validPassword');

const UserController = require('./controllers/UserController');
const Login = require('./controllers/Login');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user',
  validEmail,
  validPassword,
  UserController);

app.post('/login',
  validEmail,
  validPassword,
  Login);