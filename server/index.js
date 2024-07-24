const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Tek oda ismi, sabit olacak
const ROOM = 'singleRoom';

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Kullanıcıyı varsayılan odaya kat
    socket.join(ROOM);
    
    socket.on("message", (data) => {
        // Odaya gelen mesajları yay
        io.to(ROOM).emit("messageReturn", data);
    });

    socket.on('disconnect', () => {
        console.log(`User Disconnected: ${socket.id}`);
    });
});

const PORT = 4000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
