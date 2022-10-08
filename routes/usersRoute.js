const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/login", async function (req, res) {
  try {
    const result = await User.findOne({
      email: req.body.email,
      password: req.body.password,
      // Clearly bad practice, should be hashing here and not using plain text from the body. Learning how to do it.
    });

    if (result) {
      res.send(result);
    }
  } catch (error) {
    res.status(500).json("Error");
  }
});

router.post("/register", async function (req, res) {
  try {
    const newuser = new User(req.body);
    await newuser.save();
    res.send("User Registered Successfully!");
  } catch (error) {
    res.status(500).json("Error");
  }
});

module.exports = router;
