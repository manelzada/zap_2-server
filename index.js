const server = require('http').createServer()
const socketIO = require('socket.io')(server)

var messages = [];

socketIO.on('connection', function (client) {
  console.log('Conectado, ID:', client.id);

  socketIO.emit('messageHistory', messages);

  client.on('message', function name(data) {
    messages.push(data);
    socketIO.emit('message', data);
  });

  client.on('disconnect', function () {
    console.log('Desconectado, ID: ', client.id);
  });

  client.on('error', function (err) {
    console.log('Erro ', client.id);
    console.log(err);
  });
});

var port = process.env.PORT || 3000;

server.listen(port, function (err) {
  if (err) console.log(err);
  console.log('Rodando na porta: ', port);
});