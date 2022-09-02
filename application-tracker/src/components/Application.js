import React, { useState } from 'react';
import TextBox from './TextBox';
import TextBoxLink from './TextBoxLink';

const Application = (props) => {
    const EDIT_TEXT = "Edit";
    const SAVE_TEXT = "Save";

    const getInitialState = (props) => {
        return {
            'job-title': '' + props.count,
            'job-link': 'www.google.com',
            'job-notes': "line1 " + props.count + '\n' + 'line2.',
            'company': 'company',
            'company-notes': "company-notes",
            'application-status': "application-status",
            'application-notes': "application-notes",
        }
    }
    let [ applicationData, setApplicationData ] = useState(getInitialState(props));
    let [ buttonText, setButtonText ] = useState(EDIT_TEXT);

    let updateButtonText = () => {
        buttonText === EDIT_TEXT ?
        setButtonText(SAVE_TEXT) :
        setButtonText(EDIT_TEXT);
    }

    return (
        <div className="application-div">
            <div className="application-data-div">
                {
                    buttonText === SAVE_TEXT ?
                    <EditApplication data={ applicationData } /> :
                    <DisplayApplication data={ applicationData } />
                }
            </div>
            <div className="application-button-container">
                <button
                    onClick={() => {
                        updateButtonText();
                    }}
                >{ buttonText }</button>
            </div>
        </div>
    )
}

const EditApplication = (props) => {
    return (
        <>
            edit
        </>
    )
}

const DisplayApplication = (props) => {
    return(
        <>
            <TextBox label={ 'Job Title' } text={ props.data['job-title'] }/>
            <TextBox label={ 'Job Notes' } text={ props.data['job-notes'] } multiline={ true } />
            <TextBoxLink label={ 'Job Posting' } url={ props.data['job-link'] } />
            <TextBox label={ 'Company' } text={ props.data['company'] }/>
            <TextBox label={ 'Company Notes' } text={ props.data['company-notes'] } multiline={ true }/>
            <TextBox label={ 'Application Status' } text={ props.data['application-status'] }/>
            <TextBox label={ 'Application Notes' } text={ props.data['application-notes'] } multiline={ true }/>
        </>
    )
}

export default Application;