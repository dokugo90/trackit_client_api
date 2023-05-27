const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    pfp: {
        type: String
    },
    password: {
        type: String,
        required: true,   
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    notifications: {
        type: [Object],
        required: true
    },
})

const User = mongoose.model("users", userSchema)

module.exports = User;