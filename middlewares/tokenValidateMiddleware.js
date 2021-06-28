require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const { ERR, STATUS } = require('../config/messages');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) throw Error(ERR.tokenMissing);
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const result = await Users.findOne({
      where: { email: user.email, password: user.password },
    });
    req.user = result;
    next();
  } catch (error) {
    let message = ERR.tokenDoNotValid;
    if (error.message === ERR.tokenMissing) message = ERR.tokenMissing;
    return res.status(STATUS.unauthorized).json({ message });
  }
};

module.exports = { validateToken };
