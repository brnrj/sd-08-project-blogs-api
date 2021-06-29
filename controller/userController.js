const user = require('../services/user');

const OK = 201;

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await user.validUser(displayName, email, password, image);
    return res.status(OK).json(newUser);
  } catch (e) {
    console.log(e);
    if (e.message === 'User already registered') {
      return res.status(409).json({
        message: e.message,
      });
    }
    return res.status(400).json({
      message: e.message,
    });
  }
};

module.exports = { createUser };
