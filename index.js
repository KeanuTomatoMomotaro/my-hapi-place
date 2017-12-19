'use strict';
var fs = require('fs');
const Hapi = require('hapi');
var Jimp = require('jimp');
var moment = require('moment');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

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
        method: 'GET',
        path:'/create-token',
        handler: function (request, reply) {
            //sign with default HMAC SHA256
            var jwt = require('jsonwebtoken');
            var token = jwt.sign({secretKey: 'harambe'}, 'itsSsecret');
            //backdate a jwt to 30 seconds
            var old_token = jwt.sign({secretKey: 'harambe', iat: Math.floor(Date.now() / 1000) - 30 }, 'itsSsecret');
            
            //success
            const response = reply.response({
                _token: token,
                _oldToken: old_token
            });
            //response type app / json
            response.type('application/json');
            
            return response;
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