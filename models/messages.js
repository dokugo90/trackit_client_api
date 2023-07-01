const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
   messageText: {
    type: String,
    required: true
   },
   chatId: {
    type: String,
    required: true
   },
   sender: {
    type: Object,
    required: true
   },
}, { timestamps: true })

const Message = mongoose.model("messages", messageSchema)

module.exports = Message;