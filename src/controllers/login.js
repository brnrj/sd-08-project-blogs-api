const { login } = require('../services');
const { httpStatusCode } = require('../../constants');

const loginController = async (req, res, next) => {
  try {
    const logged = await login(req.body);
    res.status(httpStatusCode.OK).json({ token: logged });
  } catch (error) {
    return next(error);
  }
};

module.exports = loginController;
