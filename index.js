const express = require('express');
// const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth');
const controller = require('./controller/userController');
const cont = require('./controller/categoryController');
const bp = require('./controller/blogPostController');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', controller.createUser);
app.post('/login', controller.login);
app.get('/user', auth, controller.findAllUsers);
app.get('/user/:id', auth, controller.findOneUser);

app.post('/categories', auth, cont.create);
app.get('/categories', auth, cont.findAllCat);

app.post('/post', auth, bp.createBp);
app.get('/post', auth, bp.findAllPosts);
