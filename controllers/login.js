const { logUser } = require('../services/login');
const { STATUS } = require('../config/messages');

const login = async (req, res) => {
  const { body } = req;
  try {
    const result = await logUser(body);
    res.status(STATUS.ok).json(result);
  } catch (error) {
    console.log(error);
    res.status(STATUS.badRequest).json({ message: error.message });
  }
};

module.exports = { login };
