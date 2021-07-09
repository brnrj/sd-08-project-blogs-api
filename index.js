const express = require('express');
const UserController = require('./controllers/UserController');
const ErrorsUser = require('./schemas/ErrorsUser');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', ErrorsUser, UserController);

app.listen(PORT, () => console.log('ouvindo porta 3000!'));
