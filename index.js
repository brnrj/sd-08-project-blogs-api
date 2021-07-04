const express = require('express');
const userRoute = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');
const blogPostRoute = require('./routes/blogPostRoute');

const app = express();

app.use(express.json());
app.use(userRoute);
app.use(categoryRoute);
app.use(blogPostRoute);
app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
