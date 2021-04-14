var express = require('express');
var router = express.Router();

/* GET logout page. */
router.get('/', function(req, res, next) {
  res.render('logout', { title: 'Bye Bye', user:req.cookies.id });
});

module.exports = router;
