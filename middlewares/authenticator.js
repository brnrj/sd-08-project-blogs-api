const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const secret = 'secret';
const UNAUTHORIZED = 401;

const authenticator = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(UNAUTHORIZED).send({ message: 'Token not found' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        const { id } = await Users.findOne({ where: { email: decoded.data } });
        req.id = id;
        next();
    } catch (_e) {
        return res.status(UNAUTHORIZED).send({ message: 'Expired or invalid token' });
    }
};

module.exports = authenticator;