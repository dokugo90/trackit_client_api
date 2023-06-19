const express = require('express');
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddeware");
const AdminUser = require("../models/admin_user");
const User = require("../models/user.js")


router.post("/adminMessagesList", authMiddleWare, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.userEmail }).exec();
  
    const adminUserUpdated = await AdminUser.findOneAndUpdate(
      { _id: req.user.userId, messageList: { $ne: user } },
      { $addToSet: { messageList: user } },
      { new: true }
    ).exec();
  
    res.json(adminUserUpdated);
  } catch (err) {
    res.send(err);
  }
  
});

module.exports = router;