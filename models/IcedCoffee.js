const mongoose = require('mongoose');

const icedCoffeeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('IcedCoffee', icedCoffeeSchema);
