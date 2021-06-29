const express = require('express');
const bodyParses = require('body-parser');

const usersController = require('./src/controllers/userCont');
const loginController = require('./src/controllers/loginCont');

const app = express();

app.use(bodyParses.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', usersController);
app.use('/login', loginController);
