console.log("from index.js");
var connection = new WebSocket('ws://10.16.77.117:1740', "echo-protocol");

connection.onopen = wsOpen;

function wsOpen(event) {
  console.log(event);
  console.log('Connected to: ' + event.currentTarget.url);
  // var message = "websocket request demo"
  // connection.send(message);
}
connection.onclose = wsClose;

function wsClose() {
  console.log("Closed");
}

connection.onmessage = wsMessage;

function wsMessage(event) {
  console.log(event.data);
  if (parseFloat(event.data) >= 0.2 && parseFloat(event.data) <= 0.6) {
    connection.send(JSON.stringify({
      clear_interval: true
    }));
    $("<div></div>").text(parseFloat(event.data)).appendTo($('body'))
  }
}
