const express = require('express');
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddeware")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");


router.post("/sign_in",  async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).exec();
    
        if (!user) {
          return res.send({ message: 'Account does not exist' });
        }
    
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
          return res.send({ message: 'Invalid password' });
        }
    
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.send({ token });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
      }
});

module.exports = router;

