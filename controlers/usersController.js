const {
  usersServices: {
    registerUser,
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

module.exports = {
  userCreate,
};