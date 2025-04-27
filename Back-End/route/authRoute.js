const express = require("express");

const router = express.Router();

const { authController } = require('../controller/authController');
const { validateAuth } = require('../middleware/validateAuth');


router.route('/auth').post(validateAuth, authController);

module.exports = router;