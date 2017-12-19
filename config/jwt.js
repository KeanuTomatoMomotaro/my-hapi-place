'use strict';
var jwt = require('jsonwebtoken');
var moment = require('moment');

module.exports = [
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
]