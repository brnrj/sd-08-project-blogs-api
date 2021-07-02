const { createUser, login, getAllUsers, getUserById } = require('./user');
const { createCategorie, getAllCategories } = require('./categorie');
const { createPost, getAllPost } = require('./post');

module.exports = {
    createUser,
    login,
    getAllUsers,
    getUserById,
    createCategorie,
    getAllCategories,
    createPost,
    getAllPost,
};