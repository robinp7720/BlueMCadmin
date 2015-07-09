var fs = require("fs");

var serverCwd = "";
var serverJarPath = "";

var plugins = {};
plugins.requireSettings = {}

plugins.requireSettings.load = function(config){
    serverCwd = config.serverCwd;
    serverJarPath = config.serverJarPath;
};

plugins.list = function() {
    var files = fs.readdirSync(serverCwd + "plugins/");
    var plugins = [];
    for (var i = 0; i < files.length; i++) {
        var fileName = serverCwd + "plugins/" + files[i];
        var stat = fs.lstatSync(fileName);
        if (stat.isDirectory()) {

        } else if (fileName.indexOf('.jar') > 0) {
            plugins.push(files[i]);
        }
    }
    return plugins;
};

plugins.uninstall = function(plugin) {
    plugin = plugin.replace("/","");
    fs.unlink(serverCwd + "plugins/"+plugin);
    return true;
};

module.exports = plugins;