'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/hello-motto',
        handler: function (request, reply){
            return "Hello Motorola";
        }
    },
]