var express = require('express');
var bodyParser = require("body-parser");
var passport = require('passport');
var app = express();
var mongoose = require('mongoose');
routes = require('./server/routes');
var db_url = require('./config/db_url');
var http  = require('http');


var keys = require('./config/keys');
//var https = require('https');

var port = process.env.PORT || 2008;

app.all('/',function(req,res,next){
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
next();
});

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());


routes.init(app);
app.use('/v2/api', require('./server/routes/api.js'));

http.createServer(app).listen(port);
