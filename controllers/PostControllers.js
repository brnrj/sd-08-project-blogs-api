const { CreatePost: CreatePostBank,
     ListPosts: ListPostsBank } = require('../services/PostServices');

const CreatePost = async (req, resp) => {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const response = await CreatePostBank({ title, content, categoryIds, id });

    resp.status(response.code).json(response.value);
};

const ListPosts = async (_req, resp) => {
    const response = await ListPostsBank();

    resp.status(response.code).json(response.value);
};

module.exports = {
    CreatePost,
    ListPosts,
};