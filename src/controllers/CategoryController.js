const CreateCategoryService = require('../services/category/CreateCategoryService');
const GetAllCategoriesService = require('../services/category/GetAllCategoriesService');

const OK = 200;
const CREATED = 201;

module.exports = {
  async createCategory(req, res) {
    const post = await CreateCategoryService.execute(req.body);

    return res.status(CREATED).json(post);
  },

  async getAllCategories(_req, res) {
    const categories = await GetAllCategoriesService.execute();

    return res.status(OK).json(categories);
  },
};