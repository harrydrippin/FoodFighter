// Define Schemas
var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
  index: Number,
  name: String,
  color: String
});

var Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
