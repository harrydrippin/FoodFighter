var express = require('express');
var router = express.Router();

var Tag = require('../models/tags.js');

/* GET home page. */
router.get('/', function(req, res) {
  Tag.find({}, function(err, data) {
    if (err) throw err;
    else {
      res.render('tag', { tags: data});
    }
  });
});


module.exports = router;
