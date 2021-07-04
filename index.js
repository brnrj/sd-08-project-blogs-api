const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const middleware = require('./middlewares');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => response.send());

app.post('/user', userController.createUser);
app.post('/login', userController.userLogin);

app.use(middleware.auth);

app.get('/user', userController.findAllUsers);
app.get('/user/:id', userController.findUserById);

app.post('/categories', categoryController.createCategory);
app.get('/categories', categoryController.findAllCategories);

app.use(middleware.error);

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
