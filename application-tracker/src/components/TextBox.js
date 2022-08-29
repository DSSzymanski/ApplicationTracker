import React from 'react'
import '../component-css/TextBox.css'

/**
 * Basic text box used to display one line application data. Takes
 * in a label prop and a text prop to display in the application
 * component. Will return null if no label or text is supplied in props.
 *
 * @param {string} props.label: input string used to describe the text.
 * @param {string} props.text: input string of data to display on screen.
 *
 * @returns component.
 */
const TextBox = ( props ) => {
  const multilineTB = props.multiline ? props.multiline : false;

  //Returns null if label or text is not in props.
  return (
    (props.label && props.text) &&
    <div className={
      multilineTB ?
        "text-box-multi-line-container" :
        "text-box-single-line-container"
    }>
        <div className="text-box-label">
            {
              props.label + ":" }
        </div>
        <div
          className={ props.multiline ? "multi-line-text-box" : "text-box-text" }
        >
            { props.text }
        </div>
    </div>
  )
}

export default TextBox;