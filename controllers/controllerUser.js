const ServiceUser = require('../services/serviceUser');

const controllerAdd = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const resultService = await ServiceUser.addUser({ displayName, email, password, image });
  if (!resultService.user) return next(resultService);
  return res.status(200).json(resultService.user);
};

module.exports = {
  controllerAdd,
};