const ServiceUser = require('../services/serviceUser');
const code = require('../utils/code');

const controllerAdd = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const resultService = await ServiceUser.addUser({ displayName, email, password, image });
  if (!resultService.user) return next(resultService);
  return res.status(code.created).json(resultService.user);
};

module.exports = {
  controllerAdd,
};