const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes.userRoute);
app.use(routes.loginRoute);
app.use(routes.categoryRoute);
app.use(routes.postRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
