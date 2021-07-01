const postService = require('../services/post');

const getAll = async (req, res) => {
    const result = await postService.getAll();
    res.status(200).json(result);
};

const create = async (req, res) => {
    const { data: { dataValues: { id: userId } } } = req.user;
    const result = await postService.create(req.body, userId);
    if (result.message) return res.status(400).json(result);
    return res.status(201).json(result);
};

module.exports = {
    create,
    getAll,
};