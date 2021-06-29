const { createUser, login, getAllUsers, getUserById } = require('./user');
const { createCategorie, getAllCategories } = require('./categorie');

module.exports = {
    createUser,
    login,
    getAllUsers,
    getUserById,
    createCategorie,
    getAllCategories,
};