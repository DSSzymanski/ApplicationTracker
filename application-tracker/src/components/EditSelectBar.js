import React from 'react'

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