import React from 'react';
import '../component-css/Application.css';

const EditTextBox = ({ label, dataKey, value, updateFn }) => {
    return (
        <div className="input-div">
            <label htmlFor={ label }>{ label }</label>
            <input
                type="text"
                name={ label }
                defaultValue={ value }
                onChange={ e => updateFn(dataKey, e.target.value) }
            />
        </div>
    )
}

export default EditTextBox;