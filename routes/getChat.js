const express = require('express');
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddeware");
const Chats = require("../models/chats");
const Messages = require("../models/messages")
const io = require("../socket/socket")

router.post("/getChat", async (req, res) => {
    try {
        const chat = await Chats.findOne({ _id: req.body.chatId }).exec();
        res.send(chat)
    } catch (err) {
        res.send(err)
    }
})

module.exports = router;