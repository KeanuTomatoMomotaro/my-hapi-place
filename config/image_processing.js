'use strict';
var fs = require('fs');
var Jimp = require('jimp');

module.exports = [
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
]