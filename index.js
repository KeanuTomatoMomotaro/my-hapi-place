'use strict';

var routes = require('./config/index');
const Hapi = require('hapi');

//server stuff
const server = Hapi.server({
    host: 'localhost',
    port: 8000,
});

server.route(routes);

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