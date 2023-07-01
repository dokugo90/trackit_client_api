const express = require('express');
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddeware");
const Chats = require("../models/chats");
const Messages = require("../models/messages")
const io = require("../socket/socket")

router.post("/sendMessage", async (req, res) => {
    try {
        //const chat = await Chats.findOne({ chatId: req.body.chatId }).exec();
        
        const message = await Messages.create({
            messageText: req.body.messageText.trim(),
            chatId: req.body.chatId,
            sender: req.body.sender,
        })

        message.save().then( async (data) => {
            const UpdateChat = await Chats.findOneAndUpdate(
                { _id: req.body.chatId },
                { $set: { lastMessage: req.body.messageText.trim() } },
                { new: true }
              ).exec().then((_) => {
                io.emit("newMessage", { data: data })
                res.send("Sent Message")
            });
        })

    } catch {
        res.send("There was an error sending message.")
    }
})

module.exports = router;