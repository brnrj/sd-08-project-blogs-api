const signUpService = require('../services/signUpService');

const { User } = require('../models/index.js');

const signUp = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const generateToken = await signUpService.signUp(displayName, email, password, image);
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(409).json({ message: 'User already registered' });
    }
    const createUser = await User.create({ displayName, email, password, image });
    console.log(createUser);
    return res.status(201).json(generateToken);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = { signUp };
