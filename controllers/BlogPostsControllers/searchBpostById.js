const { searchSpecificBpost } = require('../../services');

const searchSpecificBlogPost = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const searchSpecific = await searchSpecificBpost(id);
    res.status(200).send(searchSpecific);
  } catch (e) {
    console.log(e.message, 'Controllers, searchSpecificBPost.js');
    res.status(500).send(e.message);
  }
};

module.exports = searchSpecificBlogPost;
