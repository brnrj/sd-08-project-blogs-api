const express = require('express');
const bodyParser = require('body-parser');
const blogPostControllers = require('./controllers/BlogPost');
const categoryControllers = require('./controllers/Category');
const loginControllers = require('./controllers/Login');
const userControllers = require('./controllers/User');
require('dotenv/config');

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => response.send());
  
app.use('/user', userControllers);
app.use('/login', loginControllers);
app.use('/categories', categoryControllers);
app.use('/post', blogPostControllers);

app.listen(port, () => console.log(`Running on port ${port}`));