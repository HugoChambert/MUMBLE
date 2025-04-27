const { createUser } = require("../services/userServices");

const authController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = await createUser(email, password);
        res.status(201).json({ message: "User created", userId: newUser.id });
    } catch ( error ) {
        console.log(error);
        res.status(500).json({ message: "Server Error"});
    }
}   

module.exports = { authController};

