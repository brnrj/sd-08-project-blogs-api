const loginService = require('../services/loginService');
const StatusCode = require('../messages/statusCodeMessages');

const login = async (req, res) => {
  try {
    const token = await loginService.login(req.body);

    res.status(StatusCode.OK).json(token);
  } catch (err) {
    const { message, code } = err;
    if (code) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(500).json({
      message,
    });
  }
};

module.exports = {
  login,
};
