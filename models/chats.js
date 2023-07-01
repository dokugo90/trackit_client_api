const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    participants: [Object],
    adminId: {
        type: String,
    },
    lastMessage: {
        type: String
    },
}, { timestamps: true })

const Chat = mongoose.model("allChats", chatSchema)

module.exports = Chat;