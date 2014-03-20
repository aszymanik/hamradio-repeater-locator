
/**
 * Module dependencies.
 */

var express = require('express');
var api = require('./routes/api');
var home = require('./routes/home');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

var sqlite3 = require('sqlite3').verbose();
exports.db = db = new sqlite3.Database('./repeaters.db');
exports.rc = rc = require('./geofunctions.js').radiuscorners;


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
// Static views
app.get('/', home.main);


// API functions
app.post('/api/repeaters', api.repeaterlist);
app.get('/api/repeater/:repeaterid', api.repeaterdetail);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
