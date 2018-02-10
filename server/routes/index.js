var mongoose = require('mongoose');
var passport = require('passport');

var jwt = require('jsonwebtoken');
var async = require('async');
var jwtsecretkey = require('../../config/keys.js');

exports.init = function(app){
    console.log("Routes");
}
