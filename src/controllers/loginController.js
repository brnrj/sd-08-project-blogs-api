const { OK } = require('../../common/constants/statusCodes');
const { loginUser } = require('../services/loginService');

const logsUserIn = async (req, res) => {
const { email, password } = req.body;

const loggedUser = await loginUser(email, password);

const { error } = loggedUser;
if (error) {
  return res.status(error.statusCode).json({ message: error.message });
}
res.status(OK).json(loggedUser);
};

module.exports = logsUserIn;
