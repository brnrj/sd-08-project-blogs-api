const express = require('express');

const CreateCategoryMiddleware = require('./middlewares/CreateCategoryMiddleware');
const CreatePostMiddleware = require('./middlewares/CreatePostMiddleware');
const CreateUserMiddleware = require('./middlewares/CreateUserMiddleware');
const GetCategoriesMiddleware = require('./middlewares/GetCategoriesMiddleware');
const GetPostsMiddleware = require('./middlewares/GetPostsMiddleware');
const GetUsersMiddleware = require('./middlewares/GetUsersMiddleware');
const LoginUserMiddleware = require('./middlewares/LoginUserMiddleware');
const ValidateTokenMiddleware = require('./middlewares/ValidateTokenMiddleware');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', CreateUserMiddleware);
app.post('/login', LoginUserMiddleware);
app.post('/categories', ValidateTokenMiddleware, CreateCategoryMiddleware);
app.post('/post', ValidateTokenMiddleware, CreatePostMiddleware);

app.get('/user/:id', ValidateTokenMiddleware, GetUsersMiddleware);
app.get('/user', ValidateTokenMiddleware, GetUsersMiddleware);
app.get('/categories', ValidateTokenMiddleware, GetCategoriesMiddleware);
app.get('/post', ValidateTokenMiddleware, GetPostsMiddleware);
