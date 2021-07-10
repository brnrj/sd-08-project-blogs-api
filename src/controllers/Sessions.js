const { Users } = require('../database/models');
const {
  emailValidator,
  passwordValidator,
  tokenGenerator,
} = require('../utils/helpers');
const { InvalidFieldsError } = require('../utils/errors');

module.exports = {
  async login(request, response) {
    try {
      const { email, password } = request.body;
      emailValidator(email);
      const user = await Users.findOne({ where: { email } });
      if (!user) throw new InvalidFieldsError();
      passwordValidator(password);
      return response.status(200).send({ token: tokenGenerator(user.id) });
    } catch (err) {
      console.error(`${err.name}`, `${err.message}`);
      return response.status(err.statusCode).send({ message: err.message });
    }
  },
};