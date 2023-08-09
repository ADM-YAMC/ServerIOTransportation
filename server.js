
const express = require('express');
const app = express();
const server = require('http').createServer((req, res) => res.end());
const io = require('socket.io')(server, {
    perMessageDeflate :false,
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', (data) => {
      const coordsWithId = { id: socket.id, ...data };
      //userCoordinates[socket.id] = coordsWithId;
      io.emit('message', coordsWithId);
   });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('listening on *:3000');
});
