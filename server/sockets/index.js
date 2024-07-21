const { Server } = require("socket.io");
const { Emitter } = require("@socket.io/postgres-emitter");

const setupSocket = (server, pool) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    },
  });

  const emitter = new Emitter(pool);

  setInterval(() => {
    emitter.emit("ping", new Date());
  }, 1000);

  const ROOM = "singleRoom";
  let users = {};

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (username) => {
      if (isUsernameTaken(username)) {
        socket.emit("username_taken", username);
      } else {
        socket.username = username;
        users[username] = socket.id;
        socket.join(ROOM);
        console.log(`User with ID: ${socket.id} joined room: ${ROOM}`);
        io.to(ROOM).emit("user_joined", username);
      }
    });

    socket.on("send_message", (data) => {
      io.to(ROOM).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
      if (socket.username) {
        delete users[socket.username];
        io.to(ROOM).emit("user_left", socket.username);
      }
    });

    function isUsernameTaken(username) {
      return username in users;
    }
  });
};

module.exports = setupSocket;
