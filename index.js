const express = require('express');

const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');

const { error, userValidation, validateJWT } = require('./middlewares');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', userValidation, usersController.createNewUser);
app.get('/user', validateJWT, usersController.getAllUsers);
app.get('/user/:id', validateJWT, usersController.getUser);

app.post('/login', loginController.validateLogin);

app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
