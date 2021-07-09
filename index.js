const express = require('express');
const { UserController, LoginController } = require('./controllers');
const { ErrorsUser, ErrorsLogin } = require('./schemas');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', ErrorsUser, UserController);
app.use('/login', ErrorsLogin, LoginController);

app.listen(PORT, () => console.log('ouvindo porta 3000!'));
