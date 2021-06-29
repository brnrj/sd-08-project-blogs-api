const jwt = require('jsonwebtoken');
require('dotenv/config');

const token = (email, password) => jwt.sign(
  { user: { email, password } },
  process.env.JWT_SECRET,
  { expiresIn: '1d', algorithm: 'HS256' },
);

const decoded = (recivedToken) => {
  try {
     return jwt.verify(recivedToken, process.env.JWT_SECRET);
  } catch (err) {
    return false;
  }
};

module.exports = {
  token,
  decoded,
};
