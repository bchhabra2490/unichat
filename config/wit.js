var keys = require('./keys');
var Wit = require('node-wit').Wit;
var interactive = require('node-wit').interactive;

const client = new Wit({accessToken: keys['wit']});

module.exports = client;
