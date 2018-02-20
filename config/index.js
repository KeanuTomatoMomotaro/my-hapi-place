'use strict';
var simple = require('./simple');
var jwt = require('./jwt');
var image_processing = require('./image_processing');
var mysql_driver = require('./mysql.js');

module.exports = [].concat(simple, jwt, image_processing, mysql_driver);