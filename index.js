const express = require('express');
const router = require('./router');
const { error } = require('./middlewares');

const app = express();
app.use(express.json());
app.use(router);
app.use(error);
app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
