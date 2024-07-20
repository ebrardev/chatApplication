import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./waiting.css";

function Waiting() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      navigate('/chat', { state: { username } });
    }
  };

  return (
    <div className="inputContainer">
      <h1 className='title'>Welcome to chat application</h1>
      <input 
        className="input" 
        type="text" 
        placeholder="username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <h2 className='text'>Use specific username for join room</h2>
      <button className="button" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Waiting;
