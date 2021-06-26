const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = process.env.JWT_SECRET;

const listaUsuarios = {
  usuarioEncontrado: { message: 'List users', status: 200 },
  tokenInexistente: { message: 'Token not found', status: 401 },
  tokenExpirado: { message: 'Expired or invalid token', status: 401 },
  usuarioDesautorizado: { message: 'Unauthorized user', status: 401 },
};

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token && typeof token !== 'string') {
      return res.status(tokenInexistente.status).send(tokenInexistente.message);
    }
    const { id } = jwt.verify(token, SECRET);
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(usuarioDesautorizado.status).send(usuarioDesautorizado.message);
    }
    req.body.userId = id;
    next();
    return;
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { auth };
