const express = require('express');
const bodyParser = require('body-parser');

const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');
const middleware = require('./middlewares');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => response.send());

app.post('/user', userController.createUser);
app.post('/login', userController.userLogin);

app.use(middleware.auth);

app.get('/user', userController.findAllUsers);
app.get('/user/:id', userController.findUserById);
app.delete('/user/me', userController.deleteUser);

app.post('/categories', categoryController.createCategory);
app.get('/categories', categoryController.findAllCategories);

app.post('/post', postController.createPost);
app.get('/post/search', postController.searchPost);
app.get('/post', postController.findAllPosts);
app.get('/post/:id', postController.findPostById);
app.put('/post/:id', postController.editPost);
app.delete('/post/:id', postController.deletePost);

app.use(middleware.error);

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
