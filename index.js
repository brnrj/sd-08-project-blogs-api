require('dotenv/config');

const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(routes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
