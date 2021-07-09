const jwt = require('jsonwebtoken');

const tokenGenerator = (email) => jwt.sign(email, process.env.JWT_SECRET);

module.exports = tokenGenerator;