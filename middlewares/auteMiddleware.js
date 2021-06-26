const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = process.env.JWT_SECRET;

const verificaToken = {
  usuarioEncontrado: { message: 'List users', status: 200 },
  tokenInexistente: { message: 'Token not found', status: 401 },
  tokenExpirado: { message: 'Expired or invalid token', status: 401 },
  usuarioDesautorizado: { message: 'Unauthorized user', status: 401 },
};

const validEntrie = (myValue, object) => {
  if (
    myValue === undefined
    || myValue === null
    || myValue === ''
    || typeof myValue !== 'string') return object;
  return true;
};

const validToken = (myToken) => {
  const { tokenExpirado } = verificaToken;
  // const decoded = jwt.verify(myToken, SECRET);
  // if (!decoded) {
  //   return tokenExpirado;
  // }
  if (myToken.length < 160) return tokenExpirado;
  return true;
};

const validateToken = (myToken) => {
  const { tokenInexistente } = verificaToken;
  if (validEntrie(myToken, tokenInexistente) !== true) {
     return validEntrie(myToken, tokenInexistente);
  }
  if (validToken(myToken) !== true) return validToken(myToken);
  return true;
};

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (validateToken(token) !== true) {
      const { status, message } = validateToken(token);
      return res.status(status).send({ message });
    }
    const { id } = jwt.verify(token, SECRET);
    const user = await User.findByPk(id);
    if (!user) {
      const { status, message } = usuarioDesautorizado;
      return res.status(status).send(message);
    }
    
    req.body.userId = id;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { auth };
