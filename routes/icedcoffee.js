const express = require('express');
const router = express.Router()
const IcedCoffee = require('../models/IcedCoffee');

//Get all Method
router.get('/', async (req, res) => {
    try{
        const data = await IcedCoffee.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//GET IcedCoffee
router.get("/find/:id", async (req, res) => {
    try {
      const product = await IcedCoffee.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;
