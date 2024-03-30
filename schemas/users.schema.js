import mongoose from "mongoose";

const Users = new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    email: String,
    age: Number,
    password: String,
    photos: {
        type: [String]
    },
    files: [String],
    wallet: {
        type: Number,
        default: 100
    },
    role: {
        type: String, // user, admin 
        default: 'user'
    },
    status: {
        type: Number,
        default: 0
    },
    oneTimePass: {
        type: Number
    }
});
const UserModel = mongoose.model('User', Users);

export default UserModel;
