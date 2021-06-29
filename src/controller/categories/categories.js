const rescue = require('express-rescue');
const helpers = require('../../helpers/helpers');

const {
  createServices,
  // loginServices,
  // findServices,
  // findIdServices,
} = require('../../sevices/categories/categories');

const createCategories = rescue(async (req, res, next) => {
  const { name } = req.body;
  const result = await createServices({ name });
  if (result.status) return next(result);
  res.status(helpers.DOU).json(result);
});

// const loginUser = rescue(async (req, res, next) => {
//   const { email, password } = req.body;
//   const token = await loginServices({ email, password });
//   if (token.status) return next(token);
//   res.status(helpers.DOO).json({ token });
// });

// const findUser = rescue(async (_req, res) => {
//   const result = await findServices();
//   res.status(helpers.DOO).json(result);
// });

// const findIdUser = rescue(async (req, res, next) => {
//   const { id } = req.params;
//   const result = await findIdServices(id);
//   if (result.status) return next(result);
//   res.status(helpers.DOO).json(result);
// });

module.exports = {
  createCategories,
  // loginUser,
  // findUser,
  // findIdUser,
};
