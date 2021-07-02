const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userController);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));