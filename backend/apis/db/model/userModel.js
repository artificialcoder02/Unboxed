const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    profilephoto: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User',userSchema);