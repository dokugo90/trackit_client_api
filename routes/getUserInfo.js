const express = require('express');
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddeware");
const User = require("../models/user");

router.post("/userInfo", async (req, res) => {
    try {
        const userDetails = await User.findOne({ _id: req.body.userId}).exec();
    res.json(userDetails);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;