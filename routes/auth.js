const express = require('express');
const router = express.Router()
const User = require('../models/User');
const CryptoJS = require("crypto-js");
//to verify that the user can do an action = authorization
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const errors = [];

  const usernameExists = await User.findOne({ username: req.body.username });
  const emailExists = await User.findOne({ email: req.body.email });
  
  if (usernameExists) {
    errors.push({ message: "Username already exists" });
  }
  if (emailExists) {
    errors.push({ message: "Email already exists" });
  }

  if (!req.body.name) {
    errors.push({message:"Name is required."});
  }

  if (!req.body.username) {
    errors.push({message:"Username is required."});
  } 
  
  if (!req.body.email) {
    errors.push({message:"Email is required."});
  } else if (!req.body.email.includes("@")) {
    errors.push({message:"Email is invalid."});
  } 
  
  if (!req.body.password) {
    errors.push({message:"Password is required."});
  } else if (req.body.password.length < 8) {
    errors.push({message:"Password is invalid."});
  }
  
  if (errors.length > 0) {
    res.status(400).json({ errors });
  }
  
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SEC_PASS_KEY
      ).toString(),
    });
  
  try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
});
  

//LOGIN
router.post('/login', async (req, res) => {
  try{
      const user = await User.findOne(
          {
              email: req.body.email
          }
      );

      !user && res.status(401).json("Wrong Email");

      const hashedPassword = CryptoJS.AES.decrypt(
          user.password,
          process.env.SEC_PASS_KEY
      );


      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      const inputPassword = req.body.password;
      
      originalPassword != inputPassword && 
          res.status(401).json("Wrong Password");
      // for example if this user wants to delete a user we check if it's id is in the token and if he is an admn so he can do that 
      const accessToken = jwt.sign(
      {
          id: user._id,
          isAdmin: user.isAdmin,
      },
      // this means that after 3days we can not access the use token anymore so the user has to login again
      process.env.JWT_SEC,
          {expiresIn:"3d"}
      );
      //we shouldnt show hashed password to anyone
      const { password, ...others } = user._doc;  
      res.status(200).json({...others, accessToken});

  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
