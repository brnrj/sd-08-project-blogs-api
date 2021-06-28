const {
  usersServices: {
    registerUser,
    listUsers,
    existsToken,
    testToken,
  },
} = require('../services');

const code = require('../services/codes');

const userCreate = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const result = await registerUser({ displayName, email, password, image });

    if (result.error) {
      return res.status(result.statusCode).json({
          message: result.error.message,
      });
  }

    return res.status(code.CREATED).json(result);
  } catch (error) {
    console.error(error);
    return res.status(code.INTERNAL_ERROR).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      const result = await existsToken();
      return res.status(result.statusCode).json(result.error);
    }
    await testToken(authorization);
    const result = await listUsers();
    if (result.error) return res.status(result.statusCode).json({ message: result.error.message });
    return res.status(code.OK).json(result);
  } catch (error) {
    console.error(error);
    return res.status(code.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  userCreate,
  getUsers,
};