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
    errors.push({ message: "Address is required." });
  }

  if (errors.length > 0) {
    // If there are validation errors, send a 400 Bad Request response
    return res.status(400).json({ errors });
  }

  const newUser = new Order(req.body);

  try {
    const savedUser = await newUser.save();
    // Send a 201 Created response with the saved user data
    res.status(201).json(savedUser);
  } catch (err) {
    // Send a 500 Internal Server Error response with the error details
    res.status(500).json({ error: err.message });
  }
});

    
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
