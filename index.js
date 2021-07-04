const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const UserController = require('./controllers/user');

app.use('/user', UserController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
