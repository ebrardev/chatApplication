const express = require('express');
const dotenv = require('dotenv');
const http = require("http");
const pool = require('./config/database');

const cors = require('./middleware/cors');
const cookieParser = require('./middleware/cookieParser');
const setupSocket = require('./sockets');
const messageRoutes = require('./routes/messages');


dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors);
app.use(cookieParser);
app.use(express.json());


// Routes
app.use(messageRoutes);


// SameSite cookies setting
app.use((req, res, next) => {
  res.cookie('mycookie', 'cookievalue', {
    sameSite: 'strict',
    secure: true, 
  });
  next();
});

// Setup socket.io
setupSocket(server, pool);

server.listen(3001, () => {
  console.log("SERVER RUNNING on port 3001");
});
