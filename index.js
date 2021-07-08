require('dotenv/config');
const express = require('express');

const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');
const middlewares = require('./middlewares');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userController);
app.use('/login', loginController);
app.use('/categories', categoryController);
app.use('/post', postController);

app.use(middlewares.error);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
