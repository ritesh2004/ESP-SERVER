// const express = require('express');
// const { createServer } = require('http');   
// const { Server } = require('socket.io');

// const app = express();

// const httpServer = createServer(app);

// const io = new Server(httpServer, {
//     cors: {
//         origin: '*',
//         methods: ['GET', 'POST'],
//     }
// }); 

// app.get('/', (req, res) => {
//   res.send('Hello World');
// }); 

// io.on('connection', (socket) => {
//     console.log('a user connected',socket.id);
//     socket.on('message', (msg) => {
//         console.log('message: ' + msg);
//         io.broadcast.emit('message', msg);
//     }
// );
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });



// httpServer.listen(3000, () => {
//     console.log('Server is running on port 3000');
//     }
// );
const WebSocket = require('ws');

const server = new WebSocket.WebSocketServer({ port: 3000 });

server.on('connection', (ws, req) => {
    const protocol = req.headers['sec-websocket-protocol'];
    console.log(`Client connected with protocol: ${protocol}`);

    ws.on('message', (message) => {
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:3000');
