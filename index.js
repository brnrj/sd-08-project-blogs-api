const express = require('express');
const bodyParser = require('body-parser');

const User = require('./controllers/User');
const Category = require('./controllers/Category');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', User);
app.use('/categories', Category);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
