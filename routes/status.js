var express = require('express');
var usage = require('usage');
var mcServ = require('../bin/mc-control.js');
var router = express.Router();

router.get('/server/usage/', function(req, res, next) {
    if (mcServ.server.running()) {
        usage.lookup(mcServ.server.pid, function (err, result) {
            res.send(result);
        });
    }else{
        res.send(false);
    }
});
router.get('/server/running/', function(req, res, next) {
    res.send(mcServ.server.running());
});
router.get('/server/plugins/', function(req, res, next) {
    res.send(mcServ.plugins.list());
});

module.exports = router;
