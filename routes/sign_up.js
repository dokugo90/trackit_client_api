const express = require('express');
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddeware");
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/sign_up", async (req, res) => {
    const userPhoto = `https://avatars.dicebear.com/api/initials/${req.body.firstName[0]}${req.body.lastName[0]}m.svg`
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10)
      const user = await User.create({
            password: hashPassword,
            pfp: userPhoto,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            notifications: []
        })
        user.save().then((info) => {
            res.send("Successfully created your account!")
            //console.log("Created account")
            //res.redirect("/login")
        }).catch((err) => {
            res.send("There was an error, creating your account.")
        })
    } catch (info) {
        if (info.code == 11000) {
            res.send("Email is already in use.")
        } else {
            res.send("Please try again later.")
        }
    }
})

module.exports = router;