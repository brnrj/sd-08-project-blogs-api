require('./database/sequelize');
const express = require('express');
const routes = require('./routes/users');

const app = express();
app.get('/', (_request, response) => {
  response.send();
});
app.use(express.json());
app.use(routes);
app.listen(3000, () => console.log('Server is running on http://localhost:3000/'));
