const { decodedToken } = require('../middlewares/jwt');
const { Post, User, Categorie } = require('../models');

async function createPost(body, authorization) {
    const { data: { id } } = decodedToken(authorization);
    const data = await Post.create({
        ...body,
        userId: id,
        published: new Date(),
        updated: new Date(),
    });
    return data;
}

async function getAllPost() {
    const data = await Post.findAll({
        include: [
            { model: User, as: 'user' },
            { model: Categorie, as: 'categories' },
        ],
    });
    return data;
}

module.exports = {
    createPost,
    getAllPost,
};
