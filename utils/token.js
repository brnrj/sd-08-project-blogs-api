const jwt = require('jsonwebtoken');
const crypto = require('./crypto');

const jwtConfig = { 
    expiresIn: '7d',
    algorithm: 'HS256',
};

const token = (user) => jwt.sign({ data: user }, crypto, jwtConfig); 

module.exports = token;