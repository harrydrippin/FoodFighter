// Define Schemas
var mongoose = require('mongoose');

var foodSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  tags: Array,
  image: { type: String, default: ""}
});

var Food = mongoose.model('Food', foodSchema);

module.exports = Food;
