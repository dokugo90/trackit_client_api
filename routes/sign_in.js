const express = require('express');
const router = express.Router();
const authMiddleWare = require("../middleware/authMiddeware")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");


router.post("/sign_in",  async (req, res) => {
    res.send("Hey sign_in")
});

module.exports = router;

