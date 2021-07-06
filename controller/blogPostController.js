const bp = require('../services/blogPost');

const createBp = async (req, res) => {
  try {      
    const { title, content, categoryIds } = req.body;
    // console.log(req.user);
    const { id } = req.user;
    const newBp = await bp.createBlogPost(title, content, categoryIds, id);
    return res.status(201).json(newBp);
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
};

const findAllPosts = async (req, res) => {
  try {
    const allPosts = await bp.findAllPosts();
    return res.status(200).json(allPosts);
  } catch (e) {
    return res.status(401).json({
      message: e.message,
    });
  }
};

module.exports = { createBp, findAllPosts };
