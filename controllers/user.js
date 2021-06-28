const user = require('../services/user');
const { STATUS } = require('../config/messages');

const createUser = async (req, res) => {
  const { body } = req;
  
  try {
    const result = await user.createUser(body);
    res.status(STATUS.created).json(result);
  } catch (error) {
    let code = STATUS.badRequest;
    if (error.message === 'User already registered') code = STATUS.conflict;

    console.log(error);
    res.status(code).json({ message: error.message });
  }
};

module.exports = { createUser };
