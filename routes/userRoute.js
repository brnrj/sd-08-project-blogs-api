const routes = require('express').Router();

routes.post('/', (_req, res) => {
  res.json({ hello: 'World' });
});

module.exports = routes;
