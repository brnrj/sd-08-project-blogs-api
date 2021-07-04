const validateUserCreation = require('../services/validateUserCreation');

const CREATED = 201;

const CreateUserMiddleware = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { error, token } = await validateUserCreation(
    { displayName, email, password, image },
  );

  if (!token) {
    const { status, message } = error;
    return res.status(status).json({ message });
  }
  
  return res.status(CREATED).json({ token });
}; 

module.exports = CreateUserMiddleware;