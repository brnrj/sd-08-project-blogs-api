const { CreateCategorie, ListCategoriesBank } = require('../services/CategoriesServices');

const AddCategories = async (req, resp) => {
     const { name } = req.body;

     const response = await CreateCategorie(name);
 
     resp.status(response.code).json(response.value);
 };

 const ListCategories = async (_req, resp) => {
    const response = await ListCategoriesBank();
 
     resp.status(response.code).json(response.value);
};

 module.exports = {
     AddCategories,
     ListCategories,
 };