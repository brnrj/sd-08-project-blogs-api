const CreateCategoryService = require('../services/category/CreateCategoryService');

const CREATED = 201;

module.exports = {
  async createCategory(req, res) {
    const post = await CreateCategoryService.execute(req.body);

    return res.status(CREATED).json(post);
  },
};