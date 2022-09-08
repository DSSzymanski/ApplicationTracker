import React, { useState } from 'react';
import TextBox from './TextBox';
import TextBoxLink from './TextBoxLink';
import EditTextBox from './EditTextBox';
import '../component-css/Application.css';
import EditTextArea from './EditTextArea';
import EditSelectBar from './EditSelectBar';

const Application = ({ index, savedData, updateStorageFn }) => {
    let [ applicationData, setApplicationData ] = useState(savedData);
    let [ editMode, setEditMode ] = useState(false);

    let changeEditMode = () => {
        setEditMode(!editMode);
    }

    let updateApplicationData = (data) => {
        setApplicationData(data);
        updateStorageFn(index, data);
    }

    return (
        <div className="application-div">
            {
                editMode === true ?
                <EditApplication data={ applicationData } changeViewClick={ changeEditMode } updateDataClick={ updateApplicationData }/> :
                <DisplayApplication data={ applicationData } changeViewClick={ changeEditMode } />
            }
        </div>
    )
}

const EditApplication = ({ data, changeViewClick, updateDataClick }) => {
    const [tentativeData, setTentativeData] = useState(data);

    let updateTentativeData = (dataKey, value) => {
        setTentativeData(prev => ({
            ...prev,
            [dataKey]: value,
        }))
    }

    return (
        <>
            <div className="application-data-div">
                <EditTextBox label={ "Job Title:" } dataKey={ 'job-title' } value={ tentativeData['job-title'] } updateFn={ updateTentativeData } />
                <EditTextBox label={ "Job Link:" } dataKey={ 'job-link' } value={ tentativeData['job-link'] } updateFn={ updateTentativeData } />
                <EditTextArea label={ "Job Notes:" } dataKey={ 'job-notes' } value={ tentativeData['job-notes'] } updateFn={ updateTentativeData } />
                <EditTextBox label={ "Company:" } dataKey={ 'company' } value={ tentativeData['company'] } updateFn={ updateTentativeData } />
                <EditTextArea label={ "Company Notes:" } dataKey={ 'company-notes' } value={ tentativeData['company-notes'] } updateFn={ updateTentativeData } />
                <EditSelectBar label={ "Application Status" } dataKey={ 'application-status' } value={ tentativeData['application-status'] } updateFn={ updateTentativeData } />
                <EditTextArea label={ "Application Notes:" } dataKey={ 'application-notes' } value={ tentativeData['application-notes'] } updateFn={ updateTentativeData } />
            </div>
            <div className="application-button-container">
                <button onClick={() => {
                    updateDataClick(tentativeData);
                    changeViewClick();
                }}>
                    Save
                </button>
            </div>
        </>
    )
}

const DisplayApplication = ({ data, changeViewClick }) => {
    return(
        <>
            <div className="application-data-div">
                <TextBox label={ 'Job Title' } text={ data['job-title'] }/>
                <TextBox label={ 'Job Notes' } text={ data['job-notes'] } multiline={ true } />
                <TextBoxLink label={ 'Job Posting' } url={ data['job-link'] } />
                <TextBox label={ 'Company' } text={ data['company'] }/>
                <TextBox label={ 'Company Notes' } text={ data['company-notes'] } multiline={ true }/>
                <TextBox label={ 'Application Status' } text={ data['application-status'] }/>
                <TextBox label={ 'Application Notes' } text={ data['application-notes'] } multiline={ true }/>
            </div>
            <div className="application-button-container">
                <button onClick={() => { changeViewClick(); }}>
                    Edit
                </button>
            </div>
        </>
    )
}

export default Application;