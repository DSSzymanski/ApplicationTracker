import React from 'react';
import '../component-css/Application.css';

/**
 * Text box input element used to edit data for a single line Application object.
 *
 * @param {str} label: string used to display with the label element.
 * @param {str} dataKey: key used in the updateFn callback to update object used in storing data.
 * @param {str} value: string representing current value stored for element.
 * @param {callback} updateFn: callback function used to pass updated value to be stored in parent element.
 * @returns React component.
 */
const EditTextBox = ({ label, dataKey, value, updateFn }) => {
    return (
        <div className="input-div">
            <label className='input-label' htmlFor={ label }>{ label }</label>
            <input
                className="input-box"
                type="text"
                name={ label }
                id={ label }
                defaultValue={ value }
                onChange={ e => updateFn(dataKey, e.target.value) }
            />
        </div>
    )
}

export default EditTextBox;