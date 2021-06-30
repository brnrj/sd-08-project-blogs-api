const express = require('express');
const blogpostController = require('./controllers/blogpost');
const categoryController = require('./controllers/category');
const loginController = require('./controllers/login');
const userController = require('./controllers/user');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/teste', (req, res) => res.status(200).json({ message: 'Hello World' }));
app.use('/user', userController);
app.use('/login', loginController);
app.use('/categories', categoryController);
app.use('/post', blogpostController);
