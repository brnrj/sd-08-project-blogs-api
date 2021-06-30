const categoriesService = require('../services/categories');

const getAll = async (req, res) => {
    const result = await categoriesService.getAll();
    res.status(200).json(result);
}; 

const create = async (req, res) => {
    const result = await categoriesService.create(req.body);
    if (result.message) return res.status(400).json(result);     
    return res.status(201).json(result);
};

module.exports = {
    create,
    getAll,
};