const express = require('express');
const router = express.Router()
const Order = require('../models/Order');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Post Method
router.post('/', verifyToken, async (req, res) => {
  const errors = [];

  if (!req.body.address) {
    errors.push({message:"Address is required."});
  }
  
  const newUser = new Order(req.body);
  
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
  }
})
    
//GET USER ORDERS
router.get("/find/:user_id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.user_id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
