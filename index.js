const express = require('express');

const routes = require('./routes');
const middlewareError = require('./middlewares/error');

const app = express();

app.use(express.json());

app.use('/user', routes.user);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(middlewareError);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));