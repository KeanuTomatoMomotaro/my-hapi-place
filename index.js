'use strict';

const Hapi = require('hapi');

// Create a server with a host and port
const server = Hapi.server({ 
    host: 'localhost', 
    port: 8000 
});

// Add the route(s)
server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, h) {

        return 'MY NAME IS KHAN';
    }
});

server.route({
    method: 'GET',
    path:'/{amount}',
    handler: function (request, reply){
        return 'Give me '+encodeURIComponent(request.params.amount)+' Cheeseburgers please!';
    
    }
})
// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();