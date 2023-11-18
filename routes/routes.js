const express = require('express');

const router = express.Router()

//Post Method
router.post('/submissions', (req, res) => {
    res.send('Post API')
})
//Get all Method
router.get('/icedcoffees', (req, res) => {
    res.send('Get All API')
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
