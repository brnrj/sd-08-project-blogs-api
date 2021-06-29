const express = require('express');

const app = express();

const { User } = require('./models');

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/users', (req, res) => {
  User.findAll().then((users) => {
    res.status(200).json(users);
  }).catch((err) => {
    console.log(err);
    res.status(404).send('ops');
  });
});
