import express from 'express'

const router = express.Router()

import { register } from '../controller/authController.js'

router.route('/register').post(register)

export default router