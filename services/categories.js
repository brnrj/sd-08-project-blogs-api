const createError = require('../utils/createError');
const { Categorie } = require('../models');
const validateCategorie = require('../middleware/categorieValidade');

const getAll = async () => {
    try {
        return await Categorie.findAll();        
    } catch (e) {
        console.log(e.message);
    }
};

const create = async (categories) => {
    const { error } = validateCategorie.validate(categories);

    if (error) return createError(error.details[0].message);

    try {
       return await Categorie.create(categories);
    } catch (err) {
       console.log(err);
    }
};

module.exports = {
    create,
    getAll,
};
