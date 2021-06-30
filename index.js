const express = require('express');
const bodyParser = require('body-parser');
const usersControllers = require('./controllers/user');

const app = express();

app.use(bodyParser.json());

app.post('/user', usersControllers.validate, usersControllers.create);
app.post('/login', usersControllers.validateLogin, usersControllers.login);

app.get('/user', usersControllers.getAll);
app.get('/user/:id', usersControllers.getById);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
