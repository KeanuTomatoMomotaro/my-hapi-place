'use strict';
var simple = require('./simple');
var jwt = require('./jwt');
var image_processing = require('./image_processing');

module.exports = [].concat(simple, jwt, image_processing);