const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get('/', (req, res) => {
  res.send('servidor ligado');
});

io.on('connection', socket => {
  chatID = socket.handshake.query.chatID;
  socket.join(chatID);

  socket.on('send_message', message => {
    receiverChatId = message.receiverChatId;
    senderChatId = message.senderChatId;
    content = message.content

    socket.in(receiverChatId).emit('receive_message', {
      'content': content,
      'senderChatId': senderChatId,
      'receiverChatId': receiverChatId,
    });

  });

  socket.on('disconnect', () => {
    socket.leave(chatID);
  });

});

http.listen(3000);