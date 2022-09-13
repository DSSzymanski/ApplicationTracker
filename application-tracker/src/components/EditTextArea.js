import React from 'react'

/**
 * Text are input element used to edit data for a multi line Application object.
 *
 * @param {str} label: string used to display with the label element.
 * @param {str} dataKey: key used in the updateFn callback to update object used in storing data.
 * @param {str} value: string representing current value stored for element.
 * @param {callback} updateFn: callback function used to pass updated value to be stored in parent element.
 * @returns React component.
 */
export const EditTextArea = ({ label, dataKey, value, updateFn }) => {
    return (
        <div className="input-div">
            <label className='text-box-label' htmlFor={ label }>{ label }</label>
            <textarea
                className='text-area-box'
                cols='50'
                rows='4'
                name={ label }
                id={ label }
                defaultValue={ value }
                onChange={ e => updateFn(dataKey, e.target.value) }
            />
        </div>
    )
}

export default EditTextArea