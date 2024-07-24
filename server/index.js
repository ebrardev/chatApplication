const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const pool = require('./config/db'); 

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

const ROOM = 'singleRoom';
const users = {};

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on('joinRoom', ({ username }) => {
        if (Object.values(users[ROOM] || {}).includes(username)) {
            socket.emit('usernameTaken', 'Bu kullanıcı adı zaten mevcut.');
            return;
        }

        if (!users[ROOM]) {
            users[ROOM] = {};
        }
        users[ROOM][socket.id] = username;

        socket.join(ROOM);
        socket.emit('roomJoined', ROOM);
        socket.broadcast.to(ROOM).emit('userJoined', username);
    });

    socket.on('message', async (data) => {
        try {
         
            await pool.query('INSERT INTO messages (message) VALUES ($1)', [data.message]);
            io.to(ROOM).emit('messageReturn', data);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        for (const room in users) {
            if (users[room][socket.id]) {
                const username = users[room][socket.id];
                delete users[room][socket.id];
                socket.broadcast.to(room).emit('userLeft', username);
                break;
            }
        }
        console.log(`User Disconnected: ${socket.id}`);
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
