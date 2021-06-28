const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const logins = require('./routes/logins');
const categories = require('./routes/categories');

const app = express();

app.use(bodyParser.json());

app.use('/user/', users);
app.use('/login/', logins);
app.use('/categories/', categories);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
