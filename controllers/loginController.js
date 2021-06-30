const loginService = require('../services/login');
const userService = require('../services/user');

const create = async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.getAll(email);
    const findEmail = user.some((element) => element.dataValues.email === email);

    const result = await loginService.create({ email, password });

    if (result.message) return res.status(400).json(result);
    if (!findEmail) return res.status(400).json({ message: 'Invalid fields' });
    return res.status(200).json({ token: result });
};

module.exports = {
    create,
};