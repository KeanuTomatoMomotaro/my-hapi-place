'use strict';
var fs = require('fs');
const Hapi = require('hapi');
var mysql = require('mysql');
var Jimp = require('jimp');
var moment = require('moment');
var bcrypt = require('bcrypt');

//server stuff
const server = Hapi.server({
    host: 'localhost',
    port: 8000,
});

//db mysql config, change later before merge
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'leantera_production_web_root'
});
//initiate connection to database
connection.connect(function(err){
    if(err){
        console.log("failed to connect to database");
        connection.end();
    }
});

server.route([
    {
        method: 'GET',
        path: '/hello-motto',
        handler: function (request, reply){
            return "Hello Motorola";
        }
    },
])

//start server
async function start() {
    try{
        await server.start();
    }
    catch(err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Server is running at:', server.info.uri);
};

start();