import React, { useState } from 'react';
import TextBox from './TextBox';
import TextBoxLink from './TextBoxLink';
import EditTextBox from './EditTextBox';
import '../component-css/Application.css';
import EditTextArea from './EditTextArea';
import EditSelectBar from './EditSelectBar';

//object which contains all keys needed to display with empty values
export const DEFAULT_EMPTY_APPLICATION = {
    'job-title': '',
    'job-link': '',
    'job-notes': '',
    'company': '',
    'company-notes': '',
    'application-status': '',
    'application-notes': '',
}

/**
 * Main application element used to both display and edit applications.
 *
 * @param {int} index: index of application as stored in local storage.
 * @param {obj} savedData: object containing saved data from local storage.
 * @param {callback} updateStorageFn: function used to update local storage with current application data.
 * @returns React Element.
 */
const Application = ({ index, savedData, updateStorageFn }) => {
    /**
     * Checks input to make sure the object has all the needed keys for operations within
     * element.
     * @param {obj} inputData data to input to make sure all keys needed exist.
     * @returns object with all needed keys.
     */
    let validateData = (inputData) => {
        if (!savedData) {
            return DEFAULT_EMPTY_APPLICATION;
        }
        for (const dataKey in DEFAULT_EMPTY_APPLICATION) {
            if (!(dataKey in inputData)) {
                inputData[dataKey] = '';
            }
        }
        return inputData;
    }

    //state used to hold data for applications.
    let [ applicationData, setApplicationData ] = useState(validateData(savedData));
    //state used to decide which application element to display.
    let [ editMode, setEditMode ] = useState(false);

    //callback used to change editMode.
    let changeEditMode = () => {
        setEditMode(!editMode);
    }

    //callback used within the EditApplication button click to update both the application data
    //in memory and the local storage.
    let updateApplicationData = (data) => {
        if (typeof index !== Number) { return(null); }
        if (index < 0) { return(null); }
        setApplicationData(data);
        updateStorageFn(index, data);
    }

    //returns EditApplicaion if editMode, and Display Applicaion elsewise.
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

/**
 * Application element used to display edittable elements used to update the Application Data.
 *
 * @param {obj} data: saved application data used to populate fields.
 * @param {callback} changeViewClick: callback used to change from edit to display applications.
 * @param {callback} updateDataClick: callback used to update the data stored in memory and in local storage.
 * @returns EditApplication element.
 */
export const EditApplication = ({ data, changeViewClick, updateDataClick }) => {
    //copy of inputed data used for holding the data in the display before save button is clicked.
    const [tentativeData, setTentativeData] = useState(data);

    //callback used in edit elements to update data.
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

/**
 * Application element used to display elements populated with Application data.
 *
 * @param {obj} data: saved application data used to populate fields.
 * @param {callback} changeViewClick: callback used to change from edit to display applications.
 * @returns DisplayApplication element.
 */
export const DisplayApplication = ({ data, changeViewClick }) => {
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