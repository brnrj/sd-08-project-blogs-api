const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const UserController = require('./controllers/user');
const LoginController = require('./controllers/login');

app.use('/user', UserController);
app.use('/login', LoginController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
