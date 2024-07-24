import React from 'react';

const Room = ({ username, setUsername, setChatScreen, socket }) => {
    const ROOM = 'singleRoom'; // Tek oda adı

    const joinChat = () => {
        socket.emit('room', ROOM); // Odaya katılma isteği
        setChatScreen(true);
    };

    return (
        <div className='flex items-center justify-center h-full'>
            <div className="w-1/3 h-[320px] rounded-xl bg-blue-600 flex flex-col space-y-4 p-3">
                <h1 className='text-center text-white my-4 font-bold text-2xl'>Welcome to chat</h1>
                <input 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    className="h-12 rounded-xl p-3 outline-none" 
                    type='text' 
                    placeholder='Username'
                />
                <div 
                    onClick={joinChat} 
                    className='tracking-wider hover:opacity-60 cursor-pointer bg-blue-900 text-white border h-12 pt-2 text-xl text-center rounded-xl'
                >
                    Join
                </div>
            </div>
        </div>
    );
};

export default Room;
