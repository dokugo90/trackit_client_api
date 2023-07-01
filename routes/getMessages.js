const express = require('express');
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddeware");
const Message = require("../models/messages");

router.post("/getMessages", async (req, res) => {
    try {
        const allMessages = await Message.find({ chatId: req.body.chatId }).exec();
    res.json(allMessages);
    } catch {
        res.send("There was an error getting all the users.")
    }
})

module.exports = router;