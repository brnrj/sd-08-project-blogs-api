const JWT = require('jsonwebtoken');
require('dotenv/config');

const SECRET = process.env.JWT_SECRET;
module.exports = {
  generateToken: async (user) => {
    const JWTConfig = {
      expiresIn: '15m',
      algorithm: 'HS256',
    };
    const token = JWT.sign({ data: user }, SECRET, JWTConfig);
    return { code: 201, token };
  },
  //   verifyToken: async (token) => {
  //     if (!token) {
  //       return { code: msg.status.unauthorized, message: msg.errorJWT };
  //     }
  //     try {
  //       const decoded = JWT.verify(token, SECRET);
  //       return decoded.data;
  //     } catch (err) {
  //       return { code: msg.status.unauthorized, message: msg.errorJWT };
  //     }
  //   },
};
