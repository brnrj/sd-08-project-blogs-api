// const GetCategoryByIdService = require('../services/category/GetCategoryByIdService');

// const { BAD_REQUEST } = require('../errors/status');

// module.exports = async (req, res, next) => {
//   const { title, content, categoryIds } = req.body;

//   if (!title) return res.status(BAD_REQUEST).json({ message: '"title" is required' });
//   if (!content) return res.status(BAD_REQUEST).json({ message: '"content" is required' });
//   if (!categoryIds) return res.status(BAD_REQUEST).json({ message: '"categoryIds" is required' });
  
//   const category = await GetCategoryByIdService.execute(categoryIds[0]);

//   if (!category) return res.status(BAD_REQUEST).json({ message: '"categoryIds" not found' });

//   next();
// };
