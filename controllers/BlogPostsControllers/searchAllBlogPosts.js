const { searchAllBPosts } = require('../../services');

const searchAllTheBPosts = async (_req, res, _next) => {
  try {
    const searching = await searchAllBPosts();
    return res.status(200).send(searching);
  } catch (e) {
    console.log(e.message, 'Controllers, searchAllTheBPosts.js');
    res.status(500).send(e.message);
  }
};
module.exports = searchAllTheBPosts;
