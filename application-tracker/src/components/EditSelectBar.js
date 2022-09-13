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
    const options = {
        'Applied' : 'Applied',
        'Called after Applying' : 'Called after Applying',
        'Interviewing' : 'Interviewing',
        'Declined after Applying' : 'Declined after Applying',
        'Declined after Interview' : 'Declined after Interview'
    }


    return (
        <div className="input-div">
            <label htmlFor={ label }>{ label }</label>
            <select
                name={ label }
                id={ label }
                value={ value in options ? value : 'Applied' }
                onChange={ e => updateFn(dataKey, e.target.value) }
            >
                {
                    Object.keys(options).map((entry, idx) => {
                        return(<option key={ idx } value={ entry }>{ options[entry] }</option>)
                    })
                }
            </select>
        </div>
    )
}

export default EditSelectBar;