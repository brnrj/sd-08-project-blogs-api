const jwt = require('jsonwebtoken');

const STATUS_401 = 401;

const auth = async (req, res, next) => {  
  const token = req.headers.authorization; 
  if (!token) return res.status(STATUS_401).json({ message: 'Token not found' });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) return res.status(STATUS_401).json({ message: 'token malformed' });
    const { email, id } = decode;    
    req.user = { email, id };
    next();
  } catch (error) {
    return res.status(STATUS_401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  auth, 
};
