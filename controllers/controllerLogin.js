const ServiceLogin = require('../services/serviceLogin');
const code = require('../utils/code');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const resultService = await ServiceLogin.login({ email, password });
  if (!resultService.token) return next(resultService);
  return res.status(code.ok).json(resultService);
};

module.exports = {
  login,
};
