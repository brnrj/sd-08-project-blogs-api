const { Categorie } = require('../models');

const badRequest = 400;

const validateBody = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title) { 
    return res.status(badRequest).json({ message: '"title" is required' }); 
  }

  if (!content) { 
    return res.status(badRequest).json({ message: '"content" is required' }); 
  }

  if (!categoryIds) { 
    return res.status(badRequest).json({ message: '"categoryIds" is required' }); 
  }

  next();
};

const validateCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;

  const categoryInfo = await Categorie.findAll();
  // console.log(categoryInfo, 'Informações das categorias');
  const allIds = categoryInfo.map(({ id }) => id);
  // console.log(allIds, 'Retorna os Ids das categorias');

  for (let i = 0; i < categoryIds.length; i += 1) {
    if (!allIds.includes(categoryIds[i])) {
      return res.status(badRequest).json({ message: '"categoryIds" not found' });
    }
  }

  next();
};

module.exports = {
  validateBody,
  validateCategoryIds,
};