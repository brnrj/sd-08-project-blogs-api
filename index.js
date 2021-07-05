const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const UserController = require('./controllers/user');
const LoginController = require('./controllers/login');
// const CategoriesController = require('./controllers/categories');
// const PostController = require('./controllers/post');

app.use('/user', UserController);
app.use('/login', LoginController);
// app.use('/categories', CategoriesController);
// app.use('/post', PostController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));
