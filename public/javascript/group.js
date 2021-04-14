var receiver = "";

// send it to server
socket.emit(
  "user_connected_to_group",
  sender,
  receiver,
  senderId
);

// listen from server
socket.on("user_connected_to_group", function (username) {
  var html = "";
  html += `<li><img src="/img/fundain_logo.png" style="height:3vh;" >GroupBot: ${username} connected.</li>`;
  document.getElementById("messages").innerHTML += html;
});

function onUserSelected(username) {
  console.log("I'm in onUserSelected");
  receiver = username;
}
function sendMessageToGroup() {
  // get message
  var message = document.getElementById("message");

  // send message to server
  socket.emit("send_message_to_group", {
    sender: sender,
    senderId: senderId,
    receiver: receiver,
    message: message.value,
  });
  var html = "";
  message.value = ""
  message.focus()

}

function sendMessage() {
  // get message
  var message = document.getElementById("message").value;

  // send message to server
  socket.emit("send_message", {
    sender: sender,
    senderId: senderId,
    receiver: receiver,
    message: message,
  });
  var html = "";
}

//  listen from server
socket.on("new_message", function (data) {
  var html = "";
  if (data.senderId == senderId) {
    html += `<li style="align-self: flex-end; margin:5%;">  ${data.message} : You </li> <br>`;
  } else {
    html += `<li style="align-self: flex-start; margin:5%;"> ${data.sender}: ${data.message}</li> <br>`;
  }
  document.getElementById("messages").innerHTML += html;
  
});

var messageInput =  document.getElementById('message')
    messageInput.addEventListener('keyup', event =>{
        if (event.keyCode === 13) {sendMessageToGroup()
        }
    })    

    function myFunction() {
        var x = document.getElementById("chatBox");
        if (x.style.display === "none") {
          x.style.display = "flex";
          document.getElementById('chatToggle').innerHTML  ="Close Chat" 
          document.getElementById('chatToggle').style.backgroundColor  = "#ff00006b";
        } else {
          x.style.display = "none";
          document.getElementById('chatToggle').innerHTML = "Open Chat"
          document.getElementById('chatToggle').style.backgroundColor = 'rgb(8 255 45 / 42%)'
          


        }
      }
