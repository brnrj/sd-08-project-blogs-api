const express = require('express');
const bodyParser = require('body-parser');

const User = require('./controllers/userController');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.post('/user', User.newUser);
app.post('/login', User.login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});