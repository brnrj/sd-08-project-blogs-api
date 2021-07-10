const User = require('../database/models/Users');
const {
  nameValidator,
  emailValidator,
  passwordValidator,
  tokenGenerator,
  tokenValidator,
  decodeToken,
} = require('../utils/helpers');
const { UserAlreadyExistsError, UserDoesNotExistsError } = require('../utils/errors');

module.exports = {
  async create(request, response) {
    try {
      const { displayName, email, password, image } = request.body;
      emailValidator(email);
      const user = await User.findOne({ where: { email } });
      if (user) throw new UserAlreadyExistsError();
      nameValidator(displayName);
      passwordValidator(password);
      await User.create({ displayName, email, password, image });
      const accessToken = tokenGenerator(email);
      return response.status(201).send({ token: accessToken });
    } catch (err) {
      console.error(`${err.name}`, `${err.message}`);
      return response.status(err.statusCode).send({ message: err.message });
    }
  },
  
  async index(request, response) {
    try {
      const { authorization } = request.headers;
      tokenValidator(authorization);
      const users = await User.findAll();
      return response.status(200).send(users);
    } catch (err) {
      console.error(`${err.name}`, `${err.message}`);
      return response.status(err.statusCode).send({ message: err.message });
    }
  },

  async show(request, response) {
    try {
      const { authorization } = request.headers;
      const { id } = request.params;
      tokenValidator(authorization);
      const user = await User.findByPk(id);
      if (!user) throw new UserDoesNotExistsError();
      return response.status(200).send(user);
    } catch (err) {
      console.error(`${err.name}`, `${err.message}`);
      return response.status(err.statusCode).send({ message: err.message });
    }
  },

  async delete(request, response) {
    try {
      const { authorization } = request.headers;
      tokenValidator(authorization);
      const decodedUser = decodeToken(authorization);
      const id = Number(decodedUser);
      await User.destroy({ where: { id } });
      return response.status(204).send();
    } catch (err) {
      console.error(`${err.name}`, `${err.message}`);
      return response.status(err.statusCode).send({ message: err.message });
    }
  },
};