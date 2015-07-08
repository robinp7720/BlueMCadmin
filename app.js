var configs = require('./bin/config.js');

var express = require('express');
var app = express();

var session = require("express-session")({
    secret: configs.app.session.secret,
    resave: true,
    saveUninitialized: true
});

var http = require('http').Server(app);
var io = require('socket.io')(http);

var sharedsession = require("express-socket.io-session");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var actions = require('./routes/actions/server');
var pluginActions = require('./routes/actions/plugins');
var status = require('./routes/status');

var mcServ = require('./bin/mc-control.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/* Setup Sessions */
app.use(session);

io.use(sharedsession(session, {
  autoSave:true
}));

/* Setup socket.io */
io.on('connection', function(socket){
    // Accept a login event with user's data
    socket.on("login", function(userdata) {
        socket.handshake.session.userdata = userdata;
    });
    socket.on("logout", function(userdata) {
        if (socket.handshake.session.userdata) {
            delete socket.handshake.session.userdata;
        }
    });
    /* Kill connection if not authenticated */
    if (socket.handshake.session.auth !== true){
        socket.disconnect();
    }else {
        /* Setup socket events */
        socket.on('command',function(msg){
            mcServ.sendCmd(msg);
        });
        socket.on('server-status',function(msg){
            if (msg == 999){
                if (mcServ.running()){
                    io.emit('server-status', 100);
                }else{
                    io.emit('server-status', 101);
                }
            }
        });

    }
});
/* Server status codes
100: server start
101: server stop
102: server auto-save
 */
mcServ.onSpawn(function(){
    io.emit('server-status', 100);
    mcServ.onLog(function (data) {
        io.emit('console', data.toString());
    });
    mcServ.on("serverStop", function(){
        io.emit('server-status', 101);
    });
    mcServ.on("autoSave", function(){
        io.emit('server-status', 102);
    });
});

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

/* Setup constant view variables */
app.locals = {
  site: {
    title: configs.app.name
  },
  url: {
    base: configs.url.base
  }
};

app.get('/logout',function(req,res,next){
  req.session.auth = false;
  res.redirect('/');
});

app.use('/', routes);
app.use('/actions/server', actions);
app.use('/actions/plugins', pluginActions);
app.use('/status', status);

// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.set('port', configs.http.port);
http.listen(configs.http.port);

