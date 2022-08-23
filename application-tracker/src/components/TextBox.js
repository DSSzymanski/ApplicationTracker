import React from 'react'
import './TextBox.css'

const TextBox = ( props ) => {
  return (
    (props.label && props.text) ?
    <div className='text-box-container' data-testid="TextBox-test-id">
        <div className="text-box-label">
            {
              props.label + ":" }
        </div>
        <div className="text-box-text">
            { props.text }
        </div>
    </div> :
    null
  )
}

export default TextBox;