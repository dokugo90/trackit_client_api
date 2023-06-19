const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
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
        required: true,
        unique: false,
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
    },
    pfp: {
        type: String,
        required: true,
        unique: false,
    },
    messageList: {
        type: [Object],
        required: true,
        unique: true,
    },
})

const AdminUser = mongoose.model("admins", adminUserSchema)

module.exports = AdminUser;