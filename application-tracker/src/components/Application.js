import React, { useState } from 'react'
import TextBox from './TextBox';

const Application = () => {
    const getInitialState = () => {
        return {
            'job-title': "",
            'job-notes': "",
            'company': "",
            'company-notes': "",
            'cv-used': "",
            'application-used': "",
            'application-status': "",
            'application-notes': "",
            'progress': "",
            'progress-notes': "",
        }
    }
    let [ applicationData, setApplicationData ] = useState(getInitialState());

    return (
        <div className="application-div">
            {Object.entries(applicationData).map((data, index) => {
                return (
                    <TextBox
                        key={ index }
                        label={ data[0] }
                        text={ data[1] }
                    />
                );
            })}
        </div>
    )
}

export default Application;