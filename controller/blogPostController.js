const bp = require('../services/blogPost');

const createBp = async (req, res) => {
  try {      
    const { title, content, categoryIds } = req.body;
    console.log(req.user);
    const { id } = req.user;
    const newBp = await bp.createBlogPost(title, content, categoryIds, id);
    return res.status(201).json(newBp);
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

module.exports = { createBp };
