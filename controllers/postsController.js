const postService = require('../services/post');

const create = async (req, res) => {
    const { data: { dataValues: { id: userId } } } = req.user;
    const result = await postService.create(req.body, userId);
    if (result.message) return res.status(400).json(result);
    return res.status(201).json(result);
};

module.exports = {
    create,
};