const serviceUser = require('../service/newUser');
const serviceLogin = require('../service/login');

const newUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const createUser = await serviceUser.newUser(displayName, email, password, image);
    return res.status(201).json(createUser);
  } catch (err) {
    if (err.message === 'User already registered') {
      return res.status(409).json({
        message: err.message,
      });
    }
    return res.status(400).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const generateToken = await serviceLogin.login(email, password);

    return res.status(200).json({ generateToken });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = { newUser, login };
