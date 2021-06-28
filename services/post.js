const { BlogPost } = require('../models');
const { decodeToken } = require('../middleware');

async function createPost(body, authorization) {
  const {
    data: { id },
  } = decodeToken(authorization);
  const addPost = await BlogPost.create({
    ...body,
    userId: id,
    published: new Date(),
    updated: new Date(),
  });
  return addPost;
}

module.exports = {
  createPost,
};
