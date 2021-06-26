const { categoriesUseCasesService } = require('../services');
const { Category } = require('../models');
  
  exports.categoriesAll = async (_req, res) => {
    try {
      const category = await Category.findAll();
      res.status(200).json(category);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
  };

  exports.categoryById = async (req, res) => {
    try {
      const category = await categoriesUseCasesService.findByCategory(req.params);
      res.status(200).json(category);
      } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
      }
  };
  
  exports.registerCategory = async (req, res) => {
    const { name } = req.body;
    try {
    const category = await categoriesUseCasesService.registerCategory({ name });
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
