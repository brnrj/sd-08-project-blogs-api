const express = require('express');
const bodyParser = require('body-parser');

const createUserController = require('./controllers/createUserController');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const tokenValidation = require('./middlewares/tokenAuth');

const app = express();

app.use(bodyParser.json());

app.post('/user', createUserController);
app.use('/user', tokenValidation, userController);
app.use('/login', loginController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
