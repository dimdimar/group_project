var socket = require('socket.io');


/**
  * Working With Sockets.
  */ 
 function chat (server){
 var io = socket(server)
 io.serveClient(true)
 var groups = []
 var users= [];
 
 io.on('connection', function(socket){
 
   console.log('User Connected', socket.id)
 
   //attach incoming listener for new user
   socket.on("user_connected_to_group",function (username, group_id ,user_id){
       // save in array
       if(!Array.isArray(groups[group_id])){
         groups[group_id] = [];
         groups[group_id][user_id] = socket.id  
         console.log('inside again')  
        }else{
          groups[group_id][user_id] = socket.id
        }  

        socket.on("disconnect", () => {
          groups.forEach((element)=> {
            element.forEach((socketElement,socketIndex )=>{
              if(socketElement == socket.id) element.splice(socketIndex,1)
            })
          });
        });
     
        var socketId = groups[group_id]; 
       // notify all connected clients to Group
       io.to(socketId).emit("user_connected_to_group", username,);
   })
   socket.on("send_message_to_group", function(data){
     
    // send event to receiver
    var socketId = groups[data.receiver];
    
    console.log(data);
    io.to(socketId).emit("new_message", data);
  })
  
   //  listen from client
   socket.on("send_message", function(data){
     
    // send event to receiver
    var socketId = users[data.receiver];
    
    console.log(data);
    io.to(socketId).emit("new_message", data);

    // save to Db
    // const query = "INSERT INTO messages (sender,receiver,message) VALUES (?,?,?)"
    // dbconnection.execute(query,data);
   })
    
   socket.on('user-disconnected', (group_id,user_id) => {
     console.log("inside User-disconnected")
     console.log("group_id :",group_id, "user_id: ",user_id)
      // socket.to(groups[group_id]).emit('user-disconnected', groups[group_id[socket.id]])
      console.log(socket.id)
      if(groups[group_id][user_id]) delete groups[group_id][user_id]
      // groups[group_id][user_id].splice(user_id,1)
        // groups[group_id[user_id
         console.log("is this undefined?",groups[group_id][user_id])
         console.log("Last seen groups",groups)
    })
   
//  ---------------------------------Following Services -------------------------\\
   socket.on("following",(data)=>{ 
    var queryFollow = `Update foundain_express.groups set followers = followers + 1 where group_id = ${data.group} `
     dbconnection.query(queryFollow,function (err,results){
      if(err){
        console.log(err)
      }else{
        console.log(results)
      }

    
    var connectFollow = `INSERT INTO follow (user_id,group_id) VALUES (${data.user},${data.group});`
    dbconnection.query(connectFollow,function (err,results){
     if(err){
       console.log(err)
     }else{
       console.log(results)
     }

   })
      })
   })

   socket.on("unfollowing",(data)=>{
    var queryUnfollow = `Update foundain_express.groups set followers = followers - 1 where group_id = ${data.group} `
     dbconnection.query(queryUnfollow,function (err,results){
      if(err){
        console.log(err)
      }else{
        console.log(results)
      }
    })
    var deletefollowing =`DELETE FROM follow WHERE user_id=${data.user} AND group_id=${data.group};`
     dbconnection.query(deletefollowing,function (err,results){
      if(err){
        console.log(err)
      }else{
        console.log(results)
      }
    })

    
   })
   
 })
}

module.exports = chat

