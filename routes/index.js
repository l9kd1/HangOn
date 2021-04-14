var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var courseService = require('../services/course.service');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.id){
    courseService.getUserCourses({user:req.cookies.id._id},1,20).then((val)=>{
      res.render('index', { title: 'Welcome', user:req.cookies.id, course : val});
    });
  }
  else res.render('index', { title: 'Welcome', course:{}});
});

module.exports = router;
