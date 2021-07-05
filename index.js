const express = require('express');

const Users = require('./controllers/Users');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/user/:id?', Users.getUsers);

app.post('/user', Users.createUser);

app.post('/login', Users.login);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
