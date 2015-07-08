var express = require('express');
var mcServ = require('../../bin/mc-control.js');
var router = express.Router();

router.get('/start', function(req, res, next) {
    res.send(mcServ.createServer());
});
router.get('/stop', function(req, res, next) {
    res.send(mcServ.stop());
    console.log("Stopped");
});
router.get('/save', function(req, res, next) {
    res.send(mcServ.save());
    console.log("Saved");
});

module.exports = router;
