const express = require('express');
const bodyParser = require('body-parser');
const {
  User,
  Category,
  Post,
} = require('./controllers');

const app = express();

app.use(bodyParser.json());

app.post('/login', User.validateLogin, User.login);

app.post('/user', User.validate, User.create);
app.get('/user', User.getAll);
app.get('/user/:id', User.getById);

app.post('/categories', Category.create);
app.get('/categories', Category.getAll);

app.post('/post', Post.validate, Post.create);
app.get('/post/:id', Post.getById);
app.get('/post', Post.getAll);
app.put('/post/:id', Post.validateUpdate, Post.update);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
