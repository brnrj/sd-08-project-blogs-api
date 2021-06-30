const express = require('express');
const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/user', routes.user);

app.use(middlewares.error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
