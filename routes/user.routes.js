/* eslint-disable linebreak-style */
const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const { blacklist } = require("../blacklist");

const UserRouter = express.Router();
UserRouter.use(express.json());

// Register new user
UserRouter.post("/register", async (req, res) => {
  const { username, email, pass, role } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) {
        res.status(200).json({ err });
      } else {
        const user = new UserModel({
          username,
          email,
          pass: hash,
          role,
        });
        await user.save();
        res.status(200).json({ msg: "New user has been registered" });
      }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// user login
UserRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(pass, user.pass, (err, result) => {
      if (err) {
        res.status(200).json({ err });
      } else {
        var token = jwt.sign(
          { userID: user._id, username: user.username },
          "masai"
        );
        res.status(200).json({ token });
      }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// user logout
UserRouter.get("/logout", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (token) {
      blacklist.push(token);
      res.status(200).json({ mag: "User has been logged out" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = { UserRouter };
