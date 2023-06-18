const express = require('express');
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddeware");
const AdminUser = require("../models/admin_user");


router.get("/admin", authMiddleWare, async (req, res) => {
    const user = await AdminUser.findOne({ _id: req.user.userId }).exec();
    if (!user) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(user);
});

module.exports = router;