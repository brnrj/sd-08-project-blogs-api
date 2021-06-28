require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const { generalError } = require('./middlewares');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', routes);

app.use(generalError);
