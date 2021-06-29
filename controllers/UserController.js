const { validationResult, matchedData } = require('express-validator');
const { User } = require('../models');
const UserService = require('../services/UserService');

module.exports = {
  addUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { code, message } = errors.errors[0].msg;
      return res.status(code).json({ message });
    }
    const data = matchedData(req);
    const userSearch = await User.findAll({ where: { email: data.email } });
    if (userSearch.length > 0) {
      return res.status(409).json({ message: 'User already registered' });
    }
    const user = await User.create(data);
    const { code, token } = await UserService.generateToken(user);
    return res.status(code).json({ token });
  },
};
