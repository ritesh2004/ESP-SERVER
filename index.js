const express = require('express');
const { createServer } = require('http');   
const { Server } = require('socket.io');

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
}); 

app.get('/', (req, res) => {
  res.send('Hello World');
}); 

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.broadcast.emit('message', msg);
    }
);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});



httpServer.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);
