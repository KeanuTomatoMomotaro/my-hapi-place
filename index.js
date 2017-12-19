'use strict';
var fs = require('fs');
const Hapi = require('hapi');
var Jimp = require('jimp');

//server stuff
const server = Hapi.server({
    host: 'localhost',
    port: 8000,
});

server.route([
    {
        method: 'GET',
        path: '/hello-motto',
        handler: function (request, reply){
            return "Hello Motorola";
        }
    },
    {
        method: 'POST',
        path: '/create-black-n-white',
        config: {
            payload: {
                maxBytes: 209715200,
                output:'stream',
                parse: true
            },
            handler: function (request, reply) {
                request.payload['image'].pipe(fs.createWriteStream("images/originals/originalImage.jpg"));
                Jimp.read("images/originals/originalImage.jpg", function (err, image){
                    if(err) throw err
                    image.resize(100,100)
                    .quality(60)
                    .greyscale()
                    .write('images/blackAndWhite/blackAndWhite.jpg');
                })
                //success
                const response = reply.response({
                    message: "Uploaded and Altered Image"
                });
                //response type app / json
                response.type('application/json');
                
                return response;
            }
        }
    }
]);

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