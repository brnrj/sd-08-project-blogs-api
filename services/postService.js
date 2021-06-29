const { BlogPost, PostsCategory, User } = require('../models');
const validateEntries = require('./postsValidations/validateEntries');

const returnObjectPost = (objectPost) => ({
  id: objectPost.id,
  userId: objectPost.userId,
  title: objectPost.title,
  content: objectPost.content,
});

const insertPost = async (title, content, categoryIds, userEmail) => {
  const isValidEntries = await validateEntries(title, content, categoryIds);
  if (isValidEntries.err) return isValidEntries;

  const user = await User.findOne({ where: { email: userEmail } });
  const { id } = user;
  const responseBlogPost = await BlogPost.create({
    title,
    content,
    userId: id,
  });

  categoryIds.forEach(async (element) => {
    await PostsCategory.create({
      postId: responseBlogPost.id,
      categoryId: element,
    });
  });
  
  return returnObjectPost(responseBlogPost);
};

module.exports = { insertPost };