const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.routes');
const loginRoute = require('./routes/login.routes');
const categoryRoute = require('./routes/categories.routes');
const postRoute = require('./routes/post.routes');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoute);

app.use('/login', loginRoute);

app.use('/categories', categoryRoute);

app.use('/post', postRoute);
