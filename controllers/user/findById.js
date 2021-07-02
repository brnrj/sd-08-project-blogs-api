const UserService = require('../../services/user');
const { errorHandling, customError } = require('../../utils');

module.exports = errorHandling(async (req, res, next) => {
  const { id } = req.params;

  const result = await UserService.findById({ where: { id } });

  if (result.err) {
    return next(customError('User does not exist', 'notFound'));
  }

  res.status(200).json(result);
});
