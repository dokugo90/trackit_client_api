const express = require('express');
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddeware");
const AdminUser = require("../models/admin_user");
const User = require("../models/user.js");
const Chat = require("../models/chats");


router.post("/adminMessagesList", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.userEmail }).exec();

   // const adminUser = await AdminUser.findOne({ _id: req.body.adminId }).exec()
  
    const adminUserUpdated = await AdminUser.findOneAndUpdate(
      { _id: req.body.adminId, messageList: { $ne: user } },
      { $addToSet: { messageList: user } },
      { new: true }
    ).exec().then( async (data) => {
      const chat = await Chat.create({
        participants: [user, data],
        adminId: data._id,
        lastMessage: "No Messages"
      })

      chat.save().then((data) => {
        res.json(data)
      })
    });
  
    //res.send("Success")
  } catch (err) {
    res.send(err);
  }
  
});

module.exports = router;