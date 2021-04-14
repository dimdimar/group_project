// // Original DB

var mysql2 = require("mysql2");

var connection = mysql2.createConnection({
    host:'ra1.anystream.eu',
    user:'root',
    password:'Maria1058@',
    database:'foundain_express',
    port:1058
});

connection.connect(function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log("Connected!");
    }
});

module.exports = connection;

// For testing db

// var mysql2 = require("mysql2");

// var connection = mysql2.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'1234',
//     database:'sakila',
//     port:3306
// });

// connection.connect(function(error) {
//     if(error) {
//         console.log(error);
//     } else {
//         console.log("Connected!");
//     }
// });

// module.exports = connection;