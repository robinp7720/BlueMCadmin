var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', page: 'Home' });
});
router.get('/usage/', function(req, res, next) {
    res.render('index', { title: 'Express', page: 'Home' });
});
router.get('/memory/', function(req, res, next) {
    res.render('index', { title: 'Express', page: 'Home' });
});
router.get('/timings/', function(req, res, next) {
    res.render('index', { title: 'Express', page: 'Home' });
});

module.exports = router;
