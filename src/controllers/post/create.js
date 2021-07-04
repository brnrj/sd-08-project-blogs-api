const rescue = require('../../utils/rescue');
const PostService = require('../../services/post');

module.exports = rescue(async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;

  const result = await PostService.create({
    title, content, categoryIds, userId,
  });

  res.status(201).json(result);
});
