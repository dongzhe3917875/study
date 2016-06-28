var socket = io.connect('http://10.16.77.117:1741');
$("form").submit(function() {
  socket.emit('chat message', $("#m").val());
  $("#m").val('');
  return false;
})
socket.on("chat message", function(msg) {
  $('#messages').append($('<li>').text(msg));
})
