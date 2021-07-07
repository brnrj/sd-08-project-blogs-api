const CreatePostService = require('../services/blogPost/CreatePostService');
const GetAllPostService = require('../services/blogPost/GetAllPostService');
const GetPostByIdService = require('../services/blogPost/GetPostByIdService');
const UpdatePostService = require('../services/blogPost/UpdatePostService');

const { NOT_FOUND } = require('../errors/status');

const OK = 200;
const CREATED = 201;

module.exports = {
  async createPost(req, res) {
    const post = await CreatePostService.execute(req.body, req.userId);

    return res.status(CREATED).json(post);
  },

  async getAllPosts(_req, res) {
    const posts = await GetAllPostService.execute();

    return res.status(OK).json(posts);
  },

  async getPostById(req, res) {
    const post = await GetPostByIdService.execute(req.params);

    if (!post) return res.status(NOT_FOUND).json({ message: 'Post does not exist' });

    return res.status(OK).json(post[0]);
  },

  async updatePost(req, res) {
    const { id } = req.params;
    const newData = req.body;

    const updatePost = await UpdatePostService.execute(id, newData);

    console.log('=========== ', updatePost.dataValues);

    if (!updatePost) return res.status(NOT_FOUND).json({ message: 'Post does not exist' });

    return res.status(OK).json(updatePost.dataValues);
  },
};
