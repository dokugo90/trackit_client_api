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
})

const AdminUser = mongoose.model("admins", adminUserSchema)

module.exports = AdminUser;