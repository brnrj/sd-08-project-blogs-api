const express = require('express');

const userControllers = require('./controllers/userController');
const loginControllers = require('./controllers/loginController');
const categoryControllers = require('./controllers/categoryControllers');

const app = express();
app.use(express.json());

app.use('/user', userControllers);
app.use('/login', loginControllers);
app.use('/categories', categoryControllers);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
