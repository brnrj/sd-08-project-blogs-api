const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./middleware/jwt');
const userController = require('./controller/userController');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', userController.criarUsuario);
app.post('/login', userController.login);
app.get('/user', auth, userController.buscarTodosUsuarios);