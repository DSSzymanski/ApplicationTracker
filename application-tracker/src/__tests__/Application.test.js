import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import Application, { EditApplication, DisplayApplication, DEFAULT_EMPTY_APPLICATION } from "../components/Application";
import { generateRandomString } from "../javascript/HelperFunctions";

const setup = () => {
    let data = {
        'job-title': 'test-title',
        'job-link': 'test-link',
        'job-notes': 'test-job-notes',
        'company': 'test-company',
        'company-notes': 'test-company-notes',
        'application-status': 'test-app-status',
        'application-notes': 'test-app-notes',
    }
    let expected_data = {
        "Job Title:": 'test-title',
        "Job Posting:": 'test-link',
        "Job Notes:": 'test-job-notes',
        "Company:": 'test-company',
        "Company Notes:": 'test-company-notes',
        "Application Status:": 'test-app-status',
        "Application Notes:": 'test-app-notes',
    }
    return {
        data,
        expected_data
    }
}

describe('Test Application and sub-applications rendering.', () => {
    test('Application renders without crashing.', () => {
        let { data } = setup();
        render(<Application />);
        render(<Application index={0} savedData={ data } updateStorageFn={ () => {return null;} } />);
    });

    test('Application renders without crashing.', () => {
        let { data } = setup();
        render(<DisplayApplication data={ data } changeViewClick={ () => {return null;} }/>);
    });

    test('Application renders without crashing.', () => {
        let { data } = setup();
        render(<EditApplication index={0} data={ data } changeViewClick={ () => {return null;} } updateDataClick={ () => {return null;} } />);
    });
});

describe('Tests for DisplayApplication.', () => {
    test('Tests display works with intended inputs.', () => {
        let { data, expected_data } = setup();
        render(<DisplayApplication data={ data } />);
        Object.keys(expected_data).map((entry, idx) => {
            expect(screen.getByText(entry)).toBeInTheDocument();
            expect(screen.getByText(expected_data[entry])).toBeInTheDocument();
        });
        //ensure button is loaded
        expect(screen.getByText('Edit')).toBeInTheDocument();
    });

    test('Tests that button works as intended when clicked.', () => {
        let { data } = setup();
        let button_clicked = false;
        const test_fn = () => { button_clicked = true; }
        render(<DisplayApplication data={ data } changeViewClick={ test_fn }/>);
        expect(screen.getByText('Edit')).toBeInTheDocument();
        const button = screen.getByRole('button');

        expect(button_clicked).toBe(false);
        fireEvent.click(button);
        expect(button_clicked).toBe(true);
    });
});