require('dotenv/config');

const express = require('express');
const middlewares = require('./middlewares');
const routes = require('./routes');
const login = require('./controllers/login');

const app = express();

app.use(express.json());

app.use('/user', routes.user);

app.use('/categories', routes.categories);

app.use('/post', routes.post);

app.post('/login', login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(middlewares.error);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
