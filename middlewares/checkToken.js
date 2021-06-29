const { decodedToken } = require('./jwt');

const NOT_FOUND = { message: 'Token not found' };
const EXPIRED = { message: 'Expired or invalid token' };
const BAD_REQUEST = 401;

const validateToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(BAD_REQUEST).json(NOT_FOUND);
    try {
        const decoded = decodedToken(token);
        console.log('token decodificado', decoded);
        if (!decoded) return res.status(BAD_REQUEST).json(EXPIRED);
        next();
    } catch (err) {
        res.status(BAD_REQUEST).json(EXPIRED);
    }
};

module.exports = {
  validateToken,
};