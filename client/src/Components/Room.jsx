import React from 'react'

const Room = () => {
  return (
    <div className='flex items-center justify-center h-full'>
        <div className="w-1/3 h-[320px] rounded-xl bg-blue-600 flex flex-col space-y-4 p-3">
        <h1 className='text-center text-white my-4 font-bold text-2xl'>Welcome to chat</h1>
        <input  className=" h-12 rounded-xl p-3 outline-none" type='text' placeholder='username'/>
        <input  className=" h-12 rounded-xl p-3 outline-none" type='text' placeholder='room'/>
        <div className=' tracking-wider hover:opacity-60 cursor-pointer bg-blue-900 text-white border h-12 pt-2 text-xl text-center rounded-xl'>join</div>
        </div>
    </div>
  )
}

export default Room