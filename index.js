const express = require('express');
const { User } = require('./models');

const app = express();

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.status(201).json({ users });
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
