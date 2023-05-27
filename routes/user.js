const express = require('express');
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddeware");
const User = require("../models/user");


router.get("/user", authMiddleWare, async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId }).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

module.exports = router;