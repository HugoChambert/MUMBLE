import User from '../models/user.js';
import { StatusCodes } from 'http-status-codes';


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const user = await User.create({ name, email, password })
        if (user) {
            console.log(` ${user} created! `)
        }

        res.status(StatusCodes.CREATED).json({ user: { name: user.name, email: user.email }})
    } catch (error) {
        console.log(error)
    }
}

export { register }