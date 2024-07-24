import "./App.css";
import Room from './Components/Room';
import Chat from './Components/Chat';
import { useState } from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function App() {
  const [username, setUsername] = useState('');
  const [chatScreen, setChatScreen] = useState(false);

  return (
    <div className="App">
      {
        !chatScreen ? 
        <Room username={username} setUsername={setUsername} setChatScreen={setChatScreen} socket={socket} />
        : 
        <Chat socket={socket} username={username} />
      }
    </div>
  );
}

export default App;
