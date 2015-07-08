var spawn = require('child_process').spawn;
var usage = require('usage');
var path = require('path');
var events = require('events');
var fs = require("fs");
var eventEmitter = new events.EventEmitter();

var Minecraftserver = {};
Minecraftserver.plugins = {};

var save_interval = 1000 * 60 * 30;

var maxRam = 4096;
var minRam = 1024;
var serverJarPath = path.join(__dirname, 'minecraft-server/Minecraft_server.jar');
var serverCwd = path.join(__dirname, 'minecraft-server/');

var mcServerProc;

/*process.on('SIGINT', function() {
    if (Minecraftserver.running()) {
        Minecraftserver.stop();
    }else{

    }
});*/

function setupMcServer() {
    mcServerProc.on('exit', function() {
        console.log("Server stopped");
        mcServerProc = undefined;
        eventEmitter.emit('serverStop');
    });
    /* Auto Save */
    setInterval(function() {
        Minecraftserver.save();
        eventEmitter.emit('autoSave');
    }, save_interval);
    eventEmitter.emit('spawn');
}

function spawnSrv(max, min, path) {
    /* Create and return minecraft server proccess for later use */
    mcServerProc = spawn('java', [
        '-Xmx' + max + 'M',
        '-Xms' + min + 'M',
        '-jar',
        path,
        'nogui'
    ], {
        cwd: serverCwd
    });
    setupMcServer();
}
Minecraftserver.onSpawn = function(cb) {
    eventEmitter.on('spawn', cb);
};

Minecraftserver.on = function(event, callback) {
    eventEmitter.on(event, callback);
};

Minecraftserver.running = function() {
    return mcServerProc !== undefined;
};

Minecraftserver.createServer = function() {
    console.log(mcServerProc);
    if (!this.running()) {
        spawnSrv(maxRam, minRam, serverJarPath);
        return true;
    } else {
        return false;
    }
};

Minecraftserver.onLog = function(cb) {
    if (this.running()) {
        mcServerProc.stdout.on('data', cb);
    }
};

Minecraftserver.sendCmd = function(cmd) {
    mcServerProc.stdin.write(cmd + '\n');
};

Minecraftserver.plugins.list = function() {
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

Minecraftserver.plugins.uninstall = function(plugin) {
    plugin = plugin.replace("/","");
    fs.unlink(serverCwd + "plugins/"+plugin);
    return true;
};

Minecraftserver.save = function() {
    if (this.running()) {
        this.sendCmd('say Saving the world now');
        this.sendCmd('save-all');
        return true;
    } else {
        return false;
    }

};

Minecraftserver.stop = function() {
    if (this.running()) {
        this.sendCmd('say Stopping server now!');
        this.sendCmd('stop');
        return true;
    } else {
        return false;
    }
};

Minecraftserver.debugStatus = function() {
    return mcServerProc;
};

Minecraftserver.usage = function() {
    if (this.running()) {
        var pid = mcServerProc.pid;
        return usage.lookup(pid, function(err, result) {

        });
    } else {
        return false;
    }
};

Minecraftserver.pid = function() {
    return mcServerProc.pid;
};

module.exports = Minecraftserver;