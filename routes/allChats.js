const express = require('express');
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddeware");
const Chats = require("../models/chats");

router.get("/chats", authMiddleWare, async (req, res) => {
    try {
        const allChats = await Chats.find().exec();
    res.json(allChats);
    } catch {
        res.send("There was an error getting all the users.")
    }
})

module.exports = router;