const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const Users = require('./controllers/users');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', rescue(Users.add));

app.post('/login', rescue(Users.add));

app.use((err, req, res, _next) => {
  const { code, message } = err;
  res.status(code).json({ message });
});
