const express = require('express');
const error = require('./ middlewares/error');
const Login = require('./controllers/login');
const User = require('./controllers/user');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/login', Login);
app.post('/user', User.create);

app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
