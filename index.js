const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
// const loginController = require('./controllers/loginController');
// const categoryController = require('./controllers/categoriesController');
// const postController = require('./controllers/postController');

const app = express();

app.use(bodyParser.json());

app.use('/user', userController);
// app.use('/login', loginController);
// app.use('/categories', categoryController);
// app.use('/post', postController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// não remova esse endpoint, e para o avaliador funcionar

app.listen(3000, () => console.log('ouvindo porta 3000!'));

module.exports = app;