const {
  loginServices: {
    tryLogin,
  },
} = require('../services');

const code = require('../services/codes');

const makeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await tryLogin({ email, password });

    if (result.error) {
      return res.status(result.statusCode).json({
        message: result.error.message,
      });
  }

    return res.status(code.OK).json(result);
  } catch (error) {
    console.error(error);
    return res.status(code.INTERNAL_ERROR).json({ message: error.message });
  }
};

module.exports = {
  makeLogin,
};