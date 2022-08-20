import React from 'react'

const TextBox = ( props ) => {
  return (
    <div className='text-box-container'>
        <div className="text-box-label">
            { props.label }
        </div>
        <div className="text-box-text">
            { props.text }
        </div>
    </div>
  )
}

export default TextBox;