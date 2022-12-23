const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  ticket: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
  },
  buy: {
    type: Boolean,
    required: true,
  },
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
