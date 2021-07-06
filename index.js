const express = require('express');
require('dotenv/config');

const userController = require('./controllers/userController');
const middlewares = require('./middlewares');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userController);

app.use(middlewares.error);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
