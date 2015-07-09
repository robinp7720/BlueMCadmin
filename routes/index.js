var express = require('express');
var router = express.Router();
var configs = require('../bin/config.js');

/* If not authenticated then just render the login page */
router.use(function (req, res, next) {
  var post = req.body;
  if (req.session.auth === undefined){
    req.session.auth = false;
  }
  /* Handle login */
  if (post != undefined) {
    if (post.username != undefined && post.password != undefined) {
      if (post.username === configs.login.username && post.password === configs.login.password) {
        req.session.auth = true;
        res.redirect('/');
      } else {
        req.session.auth = false;
      }
    }
  }
  if (req.session.auth === true){
    next();
  }else{
    res.render('login', {page: 'Login' });
  }
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {page: 'Login' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page: 'Home' });
});

/* GET console page. */
router.get('/console', function(req, res, next) {
  res.render('server-actions/console', {page: 'Server Console' });
});

/* Plugin pages */
router.get('/plugins',function(req,res,next) {
  res.render('plugins/index', {page: 'Plugins'});
});

module.exports = router;
