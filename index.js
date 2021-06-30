const express = require('express');

const app = express();
const userController = require('./controllers/UserController');
const loginController = require('./controllers/LoginController');
const categorieController = require('./controllers/CategorieController');
const postController = require('./controllers/BlogPostController');

app.use(express.json());

app.use('/user', userController);
app.use('/login', loginController);
app.use('/categories', categorieController);
app.use('/post', postController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
