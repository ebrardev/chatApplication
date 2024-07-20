import React from 'react'
import "./waiting.css"

function Waiting() {
  return (
    <div className="inputContainer">
      <h1 className='title'>Welcome to chat application</h1>
    <input className="input" type="text" placeholder="username" />
    <button className="button">Gönder</button>
  </div>
  )
}

export default Waiting