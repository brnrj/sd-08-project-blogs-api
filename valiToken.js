const jwt = require('jsonwebtoken');

const secret = 'segredosecreto';
const { Users } = require('./models');

const NOT_FOUND = 401;

const valiToken = async (req, res, next) => {
  try {
const token = req.headers.authorization;
    
if (!token) res.status(NOT_FOUND).json({ message: 'Token not found' });
const decode = jwt.verify(token, secret);
const user = await Users.findOne({ where: { email: decode.data } });

/* if (!user || user.dataValues.email !== decode.data) res.status(401).json({ message: 'Expired or invalid token' }); */
 req.user = user;
next();
  } catch (error) {
    res.status(NOT_FOUND).json({ message: 'Expired or invalid token' });
  }
};

module.exports = valiToken;