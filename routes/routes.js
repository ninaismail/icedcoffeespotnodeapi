const express = require('express');
const router = express.Router()
const IcedCoffeeModel = require('../models/IcedCoffeeModel');
const { body, validationResult } = require('express-validator');

//Post Method
router.post('/submissions', [
    body("name")
        .not()
        .isEmpty()
        .withMessage("Name is required")
        // if email is empty, the following will not be run    
        .exists()
        .withMessage("Name alrady in use."),
    body("email")
        .not()
        .isEmpty()
        .withMessage("Email is required")
        // if email is empty, the following will not be run    
        .trim()
        .isEmail()
        .withMessage("Email not valid"),
    body("phone")
        .not()
        .isEmpty()
        .withMessage("Phone is required")
        // if email is empty, the following will not be run    
        .trim()
        .isLength(8)
        .withMessage("Phone not valid")
    ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      return res.send('Success')
    }
})
//Get all Method
router.get('/icedcoffees', async (req, res) => {
    try{
        const data = await IcedCoffeeModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/icedcoffees/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/icedcoffees/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/icedcoffees/:id', (req, res) => {
    res.send('Delete by ID API')
})
module.exports = router;
