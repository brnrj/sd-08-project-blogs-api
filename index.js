const express = require('express');
const usersRoutes = require('./routes/usersRoutes');
const loginsRoutes = require('./routes/loginsRoutes');

const app = express();

app.use(express.json());
app.use('/user', usersRoutes);
app.use('/login', loginsRoutes);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
