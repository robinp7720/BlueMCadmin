var express = require('express');
var usage = require('usage');
var mcServ = require('../bin/mc-control.js');
var router = express.Router();

router.get('/server/', function(req, res, next) {
    res.send(mcServ.debugStatus());
    console.log(mcServ.debugStatus());
});

router.get('/server/usage/', function(req, res, next) {
    if (mcServ.running()) {
        usage.lookup(mcServ.pid(), function (err, result) {
            res.send(result);
        });
    }else{
        res.send(false);
    }
});
router.get('/server/running/', function(req, res, next) {
    res.send(mcServ.running());
});
router.get('/server/plugins/', function(req, res, next) {
    res.send(mcServ.getPlugins());
});

module.exports = router;
