
var http = require('http');
var socket = require('socket.io');
var dbconnection = require('./lib/db');
const { router } = require('./app');

var io = socket(server)
 
 var users= [];
 io.on('connection', function(socket){
 
   console.log('User Connected', socket.id)
 
   //attach incoming listener for new user
   socket.on("user_connected",function (username){
       // save in array
       users[username] = socket.id
 
       // socket ID will be used to send message to individual person
 
       // notify all connected clients
       io.emit("user_connected", username);

      
   })
   //  listen from client
   socket.on("send_message", function(data){
     
    // send event to receiver
    var socketId = users[data.receiver];
    
    console.log(data);
    io.to(socketId).emit("new_message", data);

    // save to Db
    const query = "INSERT INTO messages (sender,receiver,message) VALUES (?,?,?)"
    dbconnection.execute(query,data);
   })
 
 })

 module.exports = io