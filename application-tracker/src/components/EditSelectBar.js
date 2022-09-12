import React from 'react'

/**
 * Select element used to edit data the application status data in the Application element.
 *
 * @param {str} label: string used to display with the label element.
 * @param {str} dataKey: key used in the updateFn callback to update object used in storing data.
 * @param {str} value: string representing current value stored for element. Used to pick the default option upon load. 
 * @param {callback} updateFn: callback function used to pass updated value to be stored in parent element.
 * @returns React component.
 */
const EditSelectBar = ({ label, dataKey, value, updateFn }) => {
    return (
        <div className="input-div">
            <label htmlFor={ label }>{ label }</label>
            <select name={ label } id={ label } value={ value } onChange={ e => updateFn(dataKey, e.target.value) } >
                <option value="Applied">Applied</option>
                <option value="Called after Applying">Called after Applying</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Declined after Applying">Declined after Applying</option>
                <option value="Declined after Interview">Declined after Interview</option>
            </select>
        </div>
    )
}

export default EditSelectBar;