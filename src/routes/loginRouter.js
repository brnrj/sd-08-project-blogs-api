const express = require('express');
const middleware = require('../middleware');
const controllers = require('../controllers');

const router = express.Router();

router.post('/', middleware.validationLogin, async (req, res) => {
    await controllers.login(req, res);
});

module.exports = router;