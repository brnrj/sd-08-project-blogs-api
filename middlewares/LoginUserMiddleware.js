const validateUserLogin = require('../services/validateUserLogin');

const SUCCESS = 200;

const LoginUserMiddleware = async (req, res) => {
  const { email, password } = req.body;
  const { error, token } = await validateUserLogin(
    { email, password },
  );

  if (!token) {
    const { status, message } = error;
    return res.status(status).json({ message });
  }
  
  return res.status(SUCCESS).json({ token });
}; 

module.exports = LoginUserMiddleware;