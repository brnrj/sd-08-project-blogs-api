const express = require('express');
const bodyParser = require('body-parser');
const { router: userRouter } = require('./controllers/usersController');
const { router: loginRouter } = require('./controllers/loginController');
const { router: categoriesRouter } = require('./controllers/categoriesController');
const { router: postRouter } = require('./controllers/postController');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRouter);

app.use('/login', loginRouter);

app.use('/categories', categoriesRouter);

app.use('/post', postRouter);