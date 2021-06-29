const {
  postsServices: {
    createPost,
    // showPosts,
  },
} = require('../services');
const code = require('../services/codes');

const postCreate = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { title, content } = req.body;

    const result = await createPost({ title, content, authorization });

    return res.status(code.CREATED).json(result);
  } catch (error) {
    console.error(error);
    return res.status(code.INTERNAL_ERROR).json({ message: error.message });
  }
};

// const getPosts = async (req, res) => {
//   try {
//     const { name } = req.body;

//     const result = await showPosts(name);

//     return res.status(code.OK).json(result);
//   } catch (error) {
//     console.error(error);
//     return res.status(code.INTERNAL_ERROR).json({ message: error.message });
//   }
// };

module.exports = {
  postCreate,
  // getPosts,
};