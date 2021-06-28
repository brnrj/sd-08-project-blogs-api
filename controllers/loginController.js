const loginService = require('../services/loginService');
const { OK, INTERNAL_SERVER_ERROR } = require('../messages/statusCodeMessages');

const login = async (req, res) => {
  try {
    const token = await loginService.login(req.body);

    res.status(OK).json(token);
  } catch (err) {
    const { message, code } = err;
    
    if (code) return res.status(code).json({ message });
    
    return res.status(INTERNAL_SERVER_ERROR).json({
      message,
    });
  }
};

module.exports = {
  login,
};
