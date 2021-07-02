const { createUser, login, getAllUsers, findById } = require('./createUser');
const { createCategory, getCategories } = require('./createCategorie');
const { createPost, getAllPosts } = require('./createPost');

module.exports = {
    createUser,
    login,
    getAllUsers,
    findById,
    createCategory,
    getCategories,
    createPost,
    getAllPosts,
};