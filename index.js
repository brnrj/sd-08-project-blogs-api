const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const User = require('./controllers/users');
const Login = require('./controllers/login');
const Categories = require('./controllers/categories');

const ValidJWT = require('./middleware/validJWT');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/user/:id', ValidJWT, rescue(User.findUserById));
app.post('/user', rescue(User.addUser));
app.get('/user', ValidJWT, rescue(User.findAllUsers));

app.post('/login', rescue(Login));

app.post('/categories', ValidJWT, rescue(Categories.addCategory));
app.get('/categories', ValidJWT, rescue(Categories.getAllCategories));

app.use((err, _req, res, _next) => {
  return res.status(err.code).json({ message: err.message });
});
