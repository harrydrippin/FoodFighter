var express = require('express');
var router = express.Router();

var Tag = require('../models/tags.js');
var Food = require('../models/foods.js');

// var rand = Math.floor(Math.random() * 3 + 1);

// remain food number
var rm_fn;
// ips[ipId] = {};
// ips[ipId]['name'] = value;
// ips[ipId]['anotherName'] = anotherValue;

var qt_data = new Array();

Tag.find({}, function(err, data) {
  if(err) throw err;
  else {
    var cnt = 0;
    console.log(data);
    while(true) {
      if ( cnt < 4 ) {
        qt_data.push(data[cnt].name);           // 0 ~ 3 나라
      } else if ( cnt == 4 ) {
        qt_data.push(data[10].name);            // 국물 유무
        qt_data.push(data[10].name + "이 없는");
      } else if ( cnt == 5 ) {
        qt_data.push(data[9].name);             // 고기 유무
        qt_data.push("없는");
      } else if ( cnt == 6 ) {
        qt_data.push(data[4].name);             // 맛1
        qt_data.push(data[5].name);
      } else if ( cnt == 7 ) {
        qt_data.push(data[7].name);             // 맛2
        qt_data.push(data[8].name);
      } else if ( cnt == 8 ) {
        qt_data.push(data[11].name);            // 가격
        qt_data.push("저렴하지 않는");
      } else break;
      cnt++;
    }
    console.log(qt_data);
  }
});

// Food.find({}, function(err, data) {
//   if(err) throw err;
//   else {
//     console.log(data[$all].tags[0]);
//   }
// });

var con_json;
var con_str = {};
// 질문 2개
var f, s;

var y, n;

var a, b;
// real first, second question
var rfq, rsq;

// first question, second question
var fq, sq;

var qt_count = 0;
/*
  나라 question
  data[0].name vs data[1].name -> y = data[0].name, n = data[1].name
  data[2].name vs data[3].name -> y = data[2].name, n = data[3].name
  y vs n -> y = y, n = n


*/
/* GET home page. */
router.get('/', function(req, res) {
  // will render data
  // var wrd_one = f;
  // var wrd_two = s;
  // Food.find(con_json, function(err, data) {
  Food.find(con_str, function(err, data) {
    console.log(con_str);
    if (err) throw err;
    else {
      rm_fn = data.length;
      console.log(rm_fn);
      if (rm_fn < 9) {
        if (rm_fn == 0) {
          res.render('finish', {
            file: "X",
            remain: rm_fn
          });
        }
        var rand = Math.floor(Math.random() * rm_fn + 1);
        // var file_name = data[rand].image.slice(0,3) + ".PNG";
        var file_name = data[rand].name;
        // var file-data = data;
        res.render('finish', {
          file: file_name,
          remain: rm_fn
        });
      }
      switch(qt_count) {
        case 0:
          f = 0, s = 1;  // 한식 중식
          break;
        case 1:
          f = 2, s = 3;   // 일식 양식
          break;
        case 2:
          f = rfq, s = rsq; // case0_win  case1_win
          break;
        case 3:
          f = 4, s = 5;     // 국물있는 국물없는
          a = 10;
          break;
        case 4:
          f = 6, s = 7;      // 고기 있는 고기 없는
          a = 9;
          break;
        case 5:
          f = 8, s = 9;       // 맛 1
          a = 4, b = 5;
          break;
        case 6:
          f = 10, s = 11;       // 맛 2
          a =7, b = 8;
          break;
        case 7:
          f = 12, s = 13;       // 저렴 저렴아닌
          a = 11;
      }
      res.render('recommend', {
        remain: rm_fn,
        left: qt_data[f],
        right: qt_data[s],
        foodsss: data
       });
    }
  });

  // if (rm_fn < 5) {
  //
  // }


});

router.get('/y', function(req, res) {
  if (qt_count == 0) {
    rfq = 0;
    // con_json['tags[' + s + ']'] = 0;
    con_str["tags." + s] = 0;
  } else if(qt_count == 1) {
    rsq = 2;
    // con_json['tags[' + s + ']'] = 0;
    con_str["tags." + s] = 0;
  } else if(qt_count == 3) {
    con_str["tags." + a] = 1;
  } else if(qt_count == 4) {
    con_str["tags." + a] = 1;
  } else if(qt_count == 5) {
    con_str["tags." + a] = 1;
  } else if(qt_count == 6) {
    con_str["tags." + a] = 1;
  } else if(qt_count == 7) {
    con_str["tags." + a] = 1;
  } else {
    // con_json['tags[' + f + ']'] = 1;
    con_str["tags." + f] = 1;
  }
  console.log(qt_count);
  // console.log("con_json: " + con_json);
  console.log("con_str: " + con_str);
  qt_count++;
  res.status(200);
  res.redirect('/recommend');
});

router.get('/n', function (req, res) {
  if (qt_count == 0) {
    rfq = 1;
    // con_json['tags[' + f + ']'] = 0;
    con_str["tags." + f] = 0;
  } else if (qt_count == 1) {
    rsq = 3;
    // con_json['tags[' + f + ']'] = 0;
    con_str["tags." + f] = 0;
  } else if(qt_count == 3) {
    con_str["tags." + a] = 0;
  } else if(qt_count == 4) {
    con_str["tags." + a] = 0;
  } else if(qt_count == 5) {
    con_str["tags." + b] = 1;
  } else if(qt_count == 6) {
    con_str["tags." + b] = 1;
  }  else if(qt_count == 7) {
    con_str["tags." + a] = 0;
  } else {
  // con_json['tags[' + s + ']'] = 1;
  con_str["tags." + s] = 1;
  }
  console.log(qt_count);
  // console.log("con_json: " + con_json);
  console.log("con_str: " + con_str);
  qt_count++;
  res.status(200);
  res.redirect('/recommend');
});

module.exports = router;
