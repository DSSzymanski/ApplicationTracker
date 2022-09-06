import React from 'react'

export const EditTextArea = ({ label, dataKey, value, updateFn }) => {
    return (
        <div className="input-div">
            <label htmlFor={ label }>{ label }</label>
            <textarea
                cols='50'
                rows='4'
                name={ label }
                defaultValue={ value }
                onChange={ e => updateFn(dataKey, e.target.value) }
            />
        </div>
    )
}
