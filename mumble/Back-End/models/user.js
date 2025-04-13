const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Username: {
        type: String,
        require: true
    },
    Password: {
        type: String,
        require: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;