var express = require('express');
var mcServ = require('../../bin/mc-control.js');
var router = express.Router();

router.get('/uninstall/:plugin', function(req, res, next) {
    console.log(req.params);
    res.send(mcServ.plugins.uninstall(req.params.plugin));
});

module.exports = router;