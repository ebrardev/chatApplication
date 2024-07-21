// socket.js
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const joinRoom = (username) => {
  const ROOM = "singleRoom"; // Sabit oda adı
  if (username !== "") {
    socket.emit("join_room", username); // Kullanıcı adını gönder
  }
};

const handleUsernameTaken = (username, setUsername, setError, setShowChat) => {
  socket.on("username_taken", (takenUsername) => {
    if (username === takenUsername) {
      setError("This username is already taken. Please choose another one.");
      setShowChat(false); // Sohbet ekranını gizle
    }
  });
};

const handleUserJoined = (username, setShowChat) => {
  socket.on("user_joined", (joinedUsername) => {
    if (joinedUsername === username) {
      setShowChat(true); // Kullanıcı giriş yapabilirse sohbet ekranını göster
    }
  });
};

export { socket, joinRoom, handleUsernameTaken, handleUserJoined };
