const { createClerkClient } = require("@clerk/express");

const clerkClient = createClerkClient({ secretKey: "sk_test_WD32xp7OW1DppuX6Ts1Gus2Hx2oLPaOVlJpaf8bpXa"});

const createUser = async (email, password) => {
    try {
        const user = await clerkClient.users.createUser({
            emailAddress: [email],
            password: password
        });
        return user;
    } catch ( error ){
        throw error;
    }

}

module.exports = { createUser }