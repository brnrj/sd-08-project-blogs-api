const express = require('express');
const bodyParser = require('body-parser');
const USER = require('./controllers/userController');
const CATEGORIE = require('./controllers/categoriesController');
const { getToken } = require('./getToken');
const valiToken = require('./valiToken');
const POSTS = require('./controllers/postsController');
const { userValidation } = require('./validations');

const app = express();
app.use(bodyParser.json());
app.post('/user', userValidation, USER.newUser);
app.post('/login', getToken);
app.get('/user', valiToken, USER.getAll);
 app.get('/user/:id', valiToken, USER.findOne); 
 app.post('/categories', valiToken, CATEGORIE.categoryCreate);
 app.get('/categories', valiToken, CATEGORIE.getAllCategories); 
 app.post('/post', valiToken, POSTS.addPost); 
 
app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
