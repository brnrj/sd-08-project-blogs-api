const express = require('express');
const Controller = require('../controllers').BlogPosts;
const isBodyValidFor = require('../middlewares/validations').BlogPosts;
const { notFoundHandler, jwtAuthentication } = require('../middlewares');

const route = express.Router();

route.get('/:id', jwtAuthentication('Users'), Controller.findById);

route.put('/:id', jwtAuthentication('Users'), isBodyValidFor('update'), Controller.updateById);

route.delete('/:id', Controller.deleteById);

route.get('/', jwtAuthentication('Users'), Controller.getAll);

route.post('/', jwtAuthentication('Users'), isBodyValidFor('insert'), Controller.insertOne);

route.use('/:notFound', notFoundHandler);

module.exports = route;
