import React from 'react';
import '../component-css/TextBoxLink.css';

/**
 * Checks to make sure links start with http so they reach
 * outside sites and dont append to localhost.
 * 
 * @param {string} url : string representing url.
 * @returns string url with http:// in it.
 */
export const validateHTTP = ( url ) => {
    if (!url.includes('http')) {
        return 'http://' + url;
    }
    return url;
}

/**
 * Basic text box used to display one line application data. Takes
 * in a label prop and a url prop to display as a link in the application
 * component. Will return null if no label or url is supplied in props.
 * 
 * @param {string} props.label: input string used to describe the text.
 * @param {string} props.url: input string of data to display 
 *                            as a link on screen.
 * 
 * @returns component.
 */
const TextBoxLink = ( props ) => {
  return (
    (props.label && props.url) &&
    <div className='text-link-container'>
        <div className="text-link-label">
            {
              props.label + ":" }
        </div>
        <div className="text-link-url">
            <a href={ validateHTTP(props.url) }>{ props.url }</a>
        </div>
    </div>
  )
}

export default TextBoxLink;