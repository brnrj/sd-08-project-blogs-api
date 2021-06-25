const express = require('express');

const app = express();
const userController = require('./controllers/UserController');
const loginController = require('./controllers/LoginController');

app.use(express.json());

app.use('/user', userController);
app.use('/login', loginController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
