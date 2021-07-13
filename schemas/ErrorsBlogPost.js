const Joi = require('joi');
const jwt = require('jsonwebtoken');

const httpRequestError = 400;
const httpRequestErr = 401;

const userSchema = ({ title, content }) => Joi.object({
  title: Joi.string().required().error(new Error('"title" is required')),
  content: Joi.string().required().error(new Error('"content" is required')),
}).validate({ title, content });

const validateUser = (req, res, next) => {
  const JwtSecret = 'secret';
  const token = req.headers.authorization;
  const { title, content } = req.body;

  if (!token) return res.status(httpRequestErr).json({ message: 'Token not found' });

  jwt.verify(token, JwtSecret, async (err) => {
    if (err) return res.status(httpRequestErr).json({ message: 'Expired or invalid token' });
  });

  const { error } = userSchema({ title, content });
  if (error) return res.status(httpRequestError).json({ message: error.message });

  req.user = jwt.verify(token, JwtSecret);
  
  next();
};

module.exports = validateUser;
