
const validateAuth = (req, res, next) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json(" Both Email and Password are required");
    }

    next();
}

module.exports = { validateAuth };