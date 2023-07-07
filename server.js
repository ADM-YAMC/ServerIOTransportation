
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketIO = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
socketIO.on('connection', (socket) => {
  console.log('Un cliente se ha conectado. '+socket.id);
  socket.on('message', (message) => {
    console.log('Mensaje recibido: ' + message);

    socketIO.emit('message', message);
    console.log('Mensaje recibido: ' + message);
  });

  // Manejar evento de desconexión
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado.');
  });
});

// Ruta inicial
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Iniciar el servidor
const port = 3000;
server.listen(port, () => {
  console.log(`Servidor Socket.IO escuchando el puerto ${port}`);
});
