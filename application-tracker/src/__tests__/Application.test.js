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

    test("Test display doesn't display keys if not given.", () => {
        let { data, expected_data } = setup();
        let test_keys = Object.keys(data);
        //iterate over all keys
        for (let test_idx = 0; test_idx < test_keys.length; test_idx++) {
            //copy data and remove specific key to test against
            let data_copy = {...data};
            delete data_copy[test_keys[test_idx]];

            const { unmount } = render(<DisplayApplication data={ data_copy }/>);

            //make sure key that was removed is not present on screen
            Object.keys(expected_data).map((entry, idx) => {
                if (idx === test_idx) {
                    expect(screen.queryByText(entry)).not.toBeInTheDocument();
                    expect(screen.queryByText(expected_data[entry])).not.toBeInTheDocument();
                }
                else {
                    expect(screen.getByText(entry)).toBeInTheDocument();
                    expect(screen.getByText(expected_data[entry])).toBeInTheDocument();
                }
            })
            unmount();
        }
    });

    test("Test display doesn't display keys if value is empty string.", () => {
        let { data, expected_data } = setup();
        let test_keys = Object.keys(data);
        //iterate over all keys
        for (let test_idx = 0; test_idx < test_keys.length; test_idx++) {
            //copy data and set specific key to empty string to test against
            let data_copy = {...data};
            data_copy[test_keys[test_idx]] = '';

            const { unmount } = render(<DisplayApplication data={ data_copy }/>);

            //make sure key that was altered is not present on screen
            Object.keys(expected_data).map((entry, idx) => {
                if (idx === test_idx) {
                    expect(screen.queryByText(entry)).not.toBeInTheDocument();
                    expect(screen.queryByText(expected_data[entry])).not.toBeInTheDocument();
                }
                else {
                    expect(screen.getByText(entry)).toBeInTheDocument();
                    expect(screen.getByText(expected_data[entry])).toBeInTheDocument();
                }
            })
            unmount();
        }
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