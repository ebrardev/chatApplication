import React from 'react'
import "./waiting.css"

function Waiting() {
  return (
    <div className="inputContainer">
      <h1 className='title'>Welcome to chat application</h1>
    <input className="input" type="text" placeholder="username" />
     <h2 className='text'> Use spesific username for join room</h2>
    <button className="button">Login</button>
  </div>
  )
}

export default Waiting