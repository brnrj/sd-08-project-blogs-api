const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config');

const userController = require('./controllers/userController');
const middlewares = require('./middlewares');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userController);

app.use(middlewares.error);

app.listen(parseInt(PORT, 10), () => console.log(`ouvindo porta ${PORT}!`));
