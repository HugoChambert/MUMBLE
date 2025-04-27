const express = require("express");

const router = express.Router()

const { authController } = require('../controller/clerkController');

router.route('/auth').post(authController);

module.exports = router;