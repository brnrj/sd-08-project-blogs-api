const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const authJwt = require('./middlewares/authJwt');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', userController.signUp);
app.post('/login', userController.login);
app.get('/user', authJwt, userController.getAll);
app.get('/user/:id', authJwt, userController.getById);
app.post('/categories', authJwt, categoryController.postCategory);
app.get('/categories', authJwt, categoryController.getCategories);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
