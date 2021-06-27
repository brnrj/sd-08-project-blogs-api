const express = require('express');
const userControllers = require('./controllers/user');

const app = express();

app.use(express.json());

app.use('/user', userControllers);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
