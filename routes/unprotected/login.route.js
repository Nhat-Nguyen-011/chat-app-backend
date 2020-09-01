const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/login.controller');

router.route('/').post(loginController);

module.exports = router;
