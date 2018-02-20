'use strict';
// setup the mysql package for use
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'project_guestbook'
});

module.exports = [
    {
        method: 'GET',
        path:'/get-all-guest-comments',
        handler: function (request, reply) {
            // var hasil = []
                        
            // // open connection to DB
            // // connection.connect();
            // //query
            // connection.query('SELECT * FROM guest_comments', function (error, results, fields) {
            // if (error) throw error;
            // setValue(results);
            // });

            // // close connection to DB
            // // connection.end();
            
            // //success
            // const response = reply.response({
            //     result: hasil,
            // });
            // //response type app / json
            // response.type('application/json');
            
            // return response;
        }  
    },
]
