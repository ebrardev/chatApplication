import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Waiting from './Components/Waiting/Waiting';
import Chat from './Components/Chat/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Waiting />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
