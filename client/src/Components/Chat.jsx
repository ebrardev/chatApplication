import { useEffect, useState } from 'react';

const Chat = ({ socket, username }) => {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        const handleMessage = (data) => {
            console.log('Message received:', data);
          
            if (data.username !== username) {
                setMessageList((prev) => [...prev, data]);
            }
        };
    
        socket.on('messageReturn', handleMessage);
    
        return () => {
            socket.off('messageReturn', handleMessage);
        };
    }, [socket, username]);

    const sendMessage = async () => {
        const messageContent = {
            username: username,
            message: message,
            date: new Date().toLocaleTimeString(), 
        };
        await socket.emit('message', messageContent);
        setMessageList((prev) => [...prev, messageContent]);
        setMessage('');
    };

    return (
        <div className='flex items-center justify-center h-full'>
            <div className='w-1/3 h-[600px] bg-white relative'>
                <div className='w-full h-16 bg-gray-700 flex items-center p-3'>
                    <div className='w-12 h-12 bg-white rounded-full'></div>
                </div>
                <div className='w-full h-[400px] overflow-y-auto'>
                    {
                        messageList.map((msg, i) => (
                            <div key={i} className={`${username === msg.username ? 'flex justify-end' : ''}`}>
                                <div className={` ${username === msg.username ? 'bg-blue-600' : 'bg-green-600'} w-2/3 p-2 h-12 text-white m-2 rounded-xl rounded-br-none`}>
                                    <div>{msg.message}</div>
                                    <div className='w-full flex justify-end text-xs'>{msg.username} - {msg.date}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='absolute bottom-0 left-0 w-full'>
                    <input 
                        value={message} 
                        onChange={e => setMessage(e.target.value)} 
                        className='w-3/4 h-12 border outline-none' 
                        type='text'  
                        placeholder='Send message'
                    />
                    <button 
                        onClick={sendMessage} 
                        className='w-1/4 bg-blue-600 text-white h-12 hover:opacity-70'
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
