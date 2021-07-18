const express = require('express');
const error = require('./ middlewares/error');
const validateJWT = require('./ middlewares/validateJWT');
const Login = require('./controllers/login');
const User = require('./controllers/user');
const Category = require('./controllers/category');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', Login);
app.get('/user/:id', validateJWT, User.readById);
app.post('/user', User.create);
app.post('/categories', validateJWT, Category.create);
app.get('/categories', validateJWT, Category.read);
app.get('/user', validateJWT, User.read);

app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
