const express = require('express');

// require('dotenv/config');
// console.log(process.env.MYSQL_USER);

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
