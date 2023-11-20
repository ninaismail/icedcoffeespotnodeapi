const mongoose = require('mongoose');

const icedCoffeeSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    unique: true
  }, // Use your desired type for _id
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
