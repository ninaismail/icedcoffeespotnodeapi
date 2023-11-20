require('dotenv').config();
const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const icedCoffeeRoute = require('./routes/icedcoffee');
const orderRoute = require('./routes/order');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute)
app.use('/api/icedcoffee', icedCoffeeRoute)
app.use('/api/order', orderRoute)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})