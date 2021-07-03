const express = require('express');

const UserRoute = require('./routes/userRoute');
const LoginRoute = require('./routes/loginRoute');
const CategoryRoute = require('./routes/categoryRoute');
const BlogPostsRoute = require('./routes/blogPostsRoute');

const app = express();
app.use(express.json());

app.use('/user', UserRoute);
app.use('/login', LoginRoute);
app.use('/categories', CategoryRoute);
app.use('/posts', BlogPostsRoute);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
