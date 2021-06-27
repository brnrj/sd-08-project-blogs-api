const { postsUseCasesService } = require('../services');
const { BlogPost, User, Category } = require('../models');
  
  exports.postsAll = async (_req, res) => {
    try {
      const category = await BlogPost.findAll({
        include: [
          { model: User, as: 'user' }, 
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      });
      res.status(200).json(category);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
  };

  exports.postById = async (req, res) => {
    try {
      const category = await postsUseCasesService.findByPost(req.params);
      res.status(200).json(category);
      } catch (error) {
        res.status(error.statusCode).json({ message: error.message });
      }
  };
  
  exports.postRegister = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const userId = req.user.id;
    try {
    const category = await postsUseCasesService.registerPost({
      userId, title, content, categoryIds, 
    });
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };