const cookieSession = require("cookie-session");
require('dotenv').config();
const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require('./routes/auth');
const gougleAuthRoute = require('./routes/googleauth');
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
app.use(
  cookieSession({ name: "user", keys: ["myicedcoffee"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use('/auth', gougleAuthRoute)
app.use('/api/auth', authRoute)
app.use('/api/icedcoffee', icedCoffeeRoute)
app.use('/api/order', orderRoute)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})