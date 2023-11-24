const express = require('express');
const router = express.Router()
const User = require('../models/User');
const CryptoJS = require("crypto-js");
//to verify that the user can do an action = authorization
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.get("/login/success", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
    
        if (!user) {
          return res.status(401).json("Wrong Email");
        }
    
        const hashedPassword = CryptoJS.AES.decrypt(
          user.password,
          process.env.SEC_PASS_KEY
        );
    
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    
        const inputPassword = req.body.password;
    
        if (originalPassword !== inputPassword) {
          return res.status(401).json("Wrong Password");
        }
    
        // for example if this user wants to delete a user we check if it's id is in the token and if he is an admn so he can do that 
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          // this means that after 3 days we can not access the use token anymore so the user has to login again
          process.env.JWT_SEC,
          { expiresIn: "3d" }
        );
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour for the cookie to expire
        // we should not show the hashed password to anyone
        const { password, ...others } = user._doc;
        res
        .cookie('access_token', accessToken, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json({...others,accessToken});
        // res.status(200).json({ ...others, accessToken });
      } catch (err) {
        console.error(err);
        res.status(500).json(err.message || "Internal Server Error");
      }
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
module.exports = router;
