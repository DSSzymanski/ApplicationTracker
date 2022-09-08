import React, { useState, useEffect, useRef } from 'react';
import Application from '../components/Application';
import '../component-css/MainPage.css';

const APPLICATION_STORAGE_NAME = "application-list";
const DEFAULT_EMPTY_APPLICATION = {
  'job-title': '',
  'job-link': '',
  'job-notes': '',
  'company': '',
  'company-notes': '',
  'application-status': '',
  'application-notes': '',
}

const MainPage = () => {
  let [applications, setApplications] = useState([]);
  let firstRender = useRef(true);

  const addTestBtn = () => {
    setApplications(prev => ([...prev, DEFAULT_EMPTY_APPLICATION]))
  }

  const updateApplication = ( index, value ) => {
    const tempState = [...applications];
    tempState[index] = value;
    setApplications(tempState);
  }

  useEffect(() => {
    const saveApplicationsToLocalStorage = () => {
      localStorage.setItem(APPLICATION_STORAGE_NAME, JSON.stringify(applications));
    }

    if ( firstRender.current && localStorage.getItem(APPLICATION_STORAGE_NAME)) {
      setApplications(JSON.parse(localStorage.getItem(APPLICATION_STORAGE_NAME)));
      firstRender.current = false;
    }
    else {
      saveApplicationsToLocalStorage();
    }
  }, [applications])

  return (
    <div className="main-page-container">
      <div className="header-container">
        <div className="header">
          Application Tracker
        </div>
      </div>
      <div className='application-list-div'>
        {
          (applications.length > 0) &&
          applications.map((app, index) => {
            return (
              <Application key={ index } index={ index } savedData={ app } updateStorageFn={ updateApplication } />
            )
          })
        }
        <button onClick={addTestBtn}>
          add to local storage
        </button>
      </div>
    </div>
  )
}

export default MainPage;
