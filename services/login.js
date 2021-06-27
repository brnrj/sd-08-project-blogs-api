const { User } = require('../models/index');
const generateToken = require('./token');

const OK = 200;
const BAD_REQUEST = 400;
const INVALID_FIELDS = { message: 'Invalid fields' };

const post = async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ where: { email } });
  if (!userData || password !== userData.password) {
    return res.status(BAD_REQUEST).json(INVALID_FIELDS);
  }
  const token = generateToken(email);
  res.status(OK).json({ token });
};

module.exports = {
  post,
};
