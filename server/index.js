const express = require('express');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');

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

// const ROOM = 'singleRoom';

const PORT= 5000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);