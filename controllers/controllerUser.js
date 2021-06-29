const ServiceUser = require('../services/serviceUser');
const code = require('../utils/code');
// const { User, BlogPost } = require('../models');

const controllerAdd = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const resultService = await ServiceUser.addUser({ displayName, email, password, image });
  if (!resultService.token) return next(resultService);
  return res.status(code.created).json(resultService);
};

// const controllerSelectAll = async (req, res, next) => {
//   const result = await BlogPost.findAll({
//     include: { model: User, as: 'user' },
//   });
//   res.status(200).json(result);
// };

module.exports = {
  controllerAdd,
  // controllerSelectAll,
};