var ws= require('websocket.io'),
  port = 8124;

var server = ws.listen(port, function() {
  console.log('Server runnning at localhost:' + port);
});

//@notice クライアントから接続された時の処理
server.on('connection', function(socket) {
  //@notice クライアントからのメッセージ受信時の処理
  socket.on('message', function(data) {
    var data = JSON.parse(data),
      d = new Date();

    data.time = d.toLocaleString();
    data = JSON.stringify(data);
    console.log(data);

    //@notice 全てのクライアントに送信
    var clients = server.clients;
    for (var i = 0, il = clients.length; i < il; i++) {
      clients[i].send(data);
    }
  });
});
