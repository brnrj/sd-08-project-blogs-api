const express = require('express');
const routes = require('./routes');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
app.use(routes.userRoute);
app.use(routes.loginRoute);
app.use(routes.categoryRoute);
app.use(routes.postRoute);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
