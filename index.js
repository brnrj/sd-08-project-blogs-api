const express = require('express');
const { router: user } = require('./routes/user');
const { router: login } = require('./routes/login');

const app = express();

app.use(express.json());

app.use('/user', user);
app.use('/login', login);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
