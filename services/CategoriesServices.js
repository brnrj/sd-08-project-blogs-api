const { ValidName } = require('../schemas/CategoriesSchemas');
const { Categorie } = require('../models/index');

const CreateCategorie = async (name) => {
    const response = ValidName(name);

    if (!response) {
        const newUser = await Categorie.create({ name });
        return {
            code: 201,
            value: newUser,
        };
    }

    return response;
};

const ListCategoriesBank = async () => {
    try {
        const categories = await Categorie.findAll();
        if (categories.length === 0) {
        return {
            code: 404,
            value: {
                message: 'Not found Categories',
            },
        }; 
      }
        return {
            code: 200,
            value: categories,
        };
      } catch (error) {
          console.log(error);
      }
};

module.exports = {
    CreateCategorie,
    ListCategoriesBank,
};