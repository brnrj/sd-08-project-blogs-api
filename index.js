const { CelebrateError } = require('celebrate');
const express = require('express');
const { loginRoutes, usersRoutes } = require('./http/routers');
const HandleError = require('./http/errors/HandleError');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/login', loginRoutes);
app.use('/user', usersRoutes);

app.use((err, _req, res, _next) => {
  if (err instanceof CelebrateError) {
    const { message } = Array.from(err.details)[0][1];
    return res.status(400).json({
      status: 'error',
      message,
    });
  }
  if (err instanceof HandleError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err.message);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
