import React, { useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './chat.css';

const Chat = () => {
  const [username, setUsername] = useState('User1'); // Örnek kullanıcı adı, bunu dinamik hale getirebilirsiniz.
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = () => {
    if (currentMessage !== '') {
      const messageData = {
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };

      setMessageList([...messageList, messageData]);
      setCurrentMessage('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => (
            <div
              key={index}
              className="message"
              id={username === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          className="input"
        />
        <button onClick={sendMessage} className="button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
