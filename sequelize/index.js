const express = require('express');
const bodyParser = require('body-parser');

const userControllers = require('./controllers/userControllers');
const loginControllers = require('./controllers/loginControllers');
const categoriesControllers = require('./controllers/categoriesControllers');
const postControllers = require('./controllers/postControllers');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use('/user', userControllers);
app.use('/login', loginControllers);
app.use('/categories', categoriesControllers);
app.use('/post', postControllers);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});