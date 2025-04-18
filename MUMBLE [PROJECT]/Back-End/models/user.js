import mongoose from 'mongoose';

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        unique: [true, 'please provde name'],
        maxlength: 20,
        trim: true
    },    
    email: {
        type: String,
        unique: [true, 'please provide your rbc email'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please provide your passwprd'],
        trim: true,
        select: false,
        minlength: 5,
        maxlength: 20
    },
})

export default mongoose.model('User', UserSchema)