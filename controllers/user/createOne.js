const UserService = require('../../services/user');
const { errorHandling } = require('../../utils');

module.exports = errorHandling(async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const result = await UserService.createOne({ displayName, email, password, image });

  if (result.err) return next(result);
  
  res.status(201).json(result);
});
