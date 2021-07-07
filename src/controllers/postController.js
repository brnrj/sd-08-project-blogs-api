const servicePost = require('../services/postService');
const serviceCategorie = require('../services/categorieService');

async function getAllPosts(_req, res) {
  const allPosts = await servicePost.getAllPosts();
  res.status(200).json(allPosts);
}

async function createPost(req, res) {
  let data = req.body;
  const { id } = req.user;

  const allCategories = await serviceCategorie.getAllCategorie();

  const ops = allCategories.map((a) => a.dataValues.id);

  const tramela = data.categoryIds.every((v) => ops.indexOf(v) !== -1);
  if (!tramela) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  data = { userId: id, ...data };
  const postCreated = await servicePost.createPost(data);
  postCreated.dataValues.updated = undefined;
  postCreated.dataValues.published = undefined;
  res.status(201).json(postCreated);
}

module.exports = { getAllPosts, createPost };
