const server = require('http').createServer()
const socketIO = require('socket.io')(server)

socketIO.on('connection', function (client) {
  console.log('Conectado', client.id);

  let messages = [];

  client.on('messageHistory', function name(data) {
    console.log(messages);
    //socketIO.emit('messageHistory', messages);
  });

  client.on('message', function name(data) {
    messages.push(data);
    socketIO.emit('message', data);
  });

  client.on('disconnect', function () {
    console.log('Desconectado', client.id);
  });

  client.on('error', function (err) {
    console.log('Error detected', client.id);
    console.log(err);
  });
});

var port = process.env.PORT || 3000;

server.listen(port, function (err) {
  if (err) console.log(err);
  console.log('Listening on port', port);
});