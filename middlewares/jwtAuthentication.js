const jwt = require('jsonwebtoken');
const { secret } = require('../.env.js').api;
const Services = require('../services');

module.exports = (resource) => async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return next({ code: 'unauthenticated', message: 'Token not found' });

    const payload = jwt.verify(token, secret);
    
    const { result: Resource } = await Services[resource].findById(payload.data.id);
    if (!Resource) return next({ code: 'unauthenticated', message: 'Expired or invalid token' });
    
    req.resource = Resource;
    next();
  } catch (err) {
    next({ code: 'unauthenticated', message: 'Expired or invalid token' });
  }
};
