import React, { useState, useEffect, useRef } from 'react';
import Application from '../components/Application';

const APPLICATION_STORAGE_NAME = "application-list";

const MainPage = () => {
  let [applications, setApplications] = useState([]);
  let firstRender = useRef(true);

  const saveApplicationsToLocalStorage = () => {
    localStorage.setItem(APPLICATION_STORAGE_NAME, JSON.stringify(applications));
  }

  const addTestBtn = () => {
    setApplications(prev => ([...prev, applications.length]))
  }

  useEffect(() => {
    if ( firstRender.current ) {
      console.log(localStorage.getItem(APPLICATION_STORAGE_NAME))
      setApplications(
        localStorage.getItem(APPLICATION_STORAGE_NAME) ?
        JSON.parse(localStorage.getItem(APPLICATION_STORAGE_NAME)) :
        []
      );
      firstRender.current = false;
    }
    else {
      saveApplicationsToLocalStorage();
    }
  }, [applications])

  return (
    <div className='application-list-div'>
      {
        (applications.length > 0) ?
        applications.map((app, index) => {
          return (
            <Application key={ index } count={ index } />
          )
        }) :
        console.log("NO APPLICATIONS")
      }
      <button onClick={addTestBtn}>
        add to local storage
      </button>
    </div>
  )
}

export default MainPage;
