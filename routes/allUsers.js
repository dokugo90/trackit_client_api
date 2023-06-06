const express = require('express');
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddeware");
const User = require("../models/user");

router.get("/users", authMiddleWare, async (req, res) => {
    try {
        const users = await User.find().exec();
    res.json(users);
    } catch {
        res.send("There was an error getting all the users.")
    }
})

module.exports = router;