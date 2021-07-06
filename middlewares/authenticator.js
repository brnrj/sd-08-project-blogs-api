const jwt = require('jsonwebtoken');

const secret = 'secret';
const UNAUTHORIZED = 401;

const authenticator = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(UNAUTHORIZED).send({ message: 'Token not found' });
    }
    try {
        jwt.verify(token, secret);
        next();
    } catch (_e) {
        return res.status(UNAUTHORIZED).send({ message: 'Expired or invalid token' });
    }
};

module.exports = authenticator;