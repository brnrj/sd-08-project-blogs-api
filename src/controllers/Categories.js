const Category = require('../database/models/Categories');
const { tokenValidator } = require('../utils/helpers');
const { MissingParamError } = require('../utils/errors');

module.exports = {
  async create(request, response) {
    try {
      const { authorization } = request.headers;
      const { name } = request.body;
      tokenValidator(authorization);
      if (!name) throw new MissingParamError('name');
      const category = await Category.create({ name });
      return response.status(201).send(category);
    } catch (err) {
      console.error(`${err.name}`, `${err.message}`);
      return response.status(err.statusCode).send({ message: err.message });
    }
  },
};