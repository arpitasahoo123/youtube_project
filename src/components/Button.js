import React from 'react'

function Button({name}) {
  return (
    <div>
        <button className="p-3 m-2 bg-gray-100 rounded-lg">{name}</button>
    </div>
  )
}

export default Button