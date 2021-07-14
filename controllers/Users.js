const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const UserService = require('../services/Users');
const UserVerify = require('../services/utils/userSchema');

const createUser = rescue(async (req, res, next) => {
    const { error } = UserVerify.validate(req.body);
    if (error) { next(error); }

    const { email, password } = await UserService.createUser({ ...req.body });

    const payload = { email, password };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token });
});

const findAll = rescue(async (req, res) => {
    const allUsers = await UserService.findAll();
    res.status(200).json(allUsers);
});

module.exports = { createUser, findAll };