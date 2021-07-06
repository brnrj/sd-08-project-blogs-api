const express = require('express');
const bodyParser = require('body-parser');

const User = require('./controllers/userController');
const validate = require('./middleware/jwt');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.post('/user', User.newUser);
app.get('/user/:id', validate, User.getUserById);
app.get('/user', validate, User.getAllUsers);

app.post('/login', User.login);

app.post('/categories', validate, User.createCategory);
app.get('/categories', validate, User.getAllCategories);

app.post('/post', validate, User.newPost);
app.get('/post', validate, User.getAllPosts);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});