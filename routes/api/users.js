const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../../models/User");

router
  .route("/")
  // @route   POST api/users
  // @desc    Register new user
  // @access  Public
  .post((req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    User.findOne({ email }).then(user => {
      if (user) return res.status(400).json({ msg: "User already exists" });

      const newUser = User({ name, email, password });

      // Create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => {
            jwt.sign(
              { id: user.id },
              process.env.JWT_SECRET,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: { id: user.id, name: user.name, email: user.email },
                });
              }
            );
          });
        });
      });
    });
  });

module.exports = router;
