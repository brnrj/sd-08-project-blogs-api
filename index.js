const express = require('express');
require('dotenv/config');
const usersControllers = require('./controllers/usersControllers');
const loginControllers = require('./controllers/loginControllers');
const categoriesControllers = require('./controllers/categoriesControllers');
const blogPostsControllers = require('./controllers/blogPostsControllers');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', usersControllers);
app.use('/login', loginControllers);
app.use('/categories', categoriesControllers);
app.use('/post', blogPostsControllers);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

module.exports = app;
