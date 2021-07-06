const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./middleware/jwt');
const userController = require('./controller/userController');
const categoryController = require('./controller/categoryController');

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
app.get('/user/:id', auth, userController.buscarUsuarioPorId);

app.post('/categories', auth, categoryController.criarCategoria);