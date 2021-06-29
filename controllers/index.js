const { createUser, login, getAllUsers, findById } = require('./createUser');
const { createCategory, getCategories } = require('./createCategorie');

module.exports = {
    createUser,
    login,
    getAllUsers,
    findById,
    createCategory,
    getCategories,
};