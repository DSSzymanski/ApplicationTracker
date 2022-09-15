import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import EditSelectBar from '../components/EditSelectBar';
import { generateRandomString } from "../javascript/HelperFunctions";

const setup = () => {
    let test_key = generateRandomString();
    let test_label = 'test_label';
    let select_cases = [
        'Applied',
        'Called after Applying',
        'Interviewing',
        'Declined after Applying',
        'Declined after Interview'
    ]
    return {
        test_key,
        test_label,
        select_cases
    }
  }

test('EditSelectBar renders without crashing.', () => {
    const { test_label, test_key } = setup();
    render(<EditSelectBar />);
    render(<EditSelectBar
        label={ test_label }
        dataKey={ test_key }
        value={ 'Applied' }
        updateFn={ () =>{return null;} }
    />);
    render(<EditSelectBar
        label={ test_label }
        dataKey={ test_key }
        value={ 'Fail' } //incorrect input
        updateFn={ () =>{return null;} }
    />);
});

describe('Test suite for the display of EditSelectBar.', () => {
    test('Tests label text when no input is given.', () => {
        const { container } = render(<EditSelectBar />);
        expect(container).not.toBeEmptyDOMElement();
        expect(container.getElementsByClassName('select-bar-label').item(0).innerHTML).toBe('');
    });

    test('Tests label text is displayed with random inputs.', () => {
        for (let i = 0; i < 10; i++) {
            const randomInputString = generateRandomString();
            const { unmount } = render(<EditSelectBar label={ randomInputString } />)
            expect(screen.getByText(randomInputString)).toBeInTheDocument();
            unmount();
        }
    });

    test('Tests default option is selected when no value input is given.', () => {
        const { container } = render(<EditSelectBar />);
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText('Applied')).toBeInTheDocument();
    });

    test('Tests all valid value inputs show their respective option.', () => {
        let { select_cases } = setup();
        for (const option of select_cases) {
            const { container, unmount } = render(<EditSelectBar value={ option } />)
            expect(container).not.toBeEmptyDOMElement();
            expect(screen.getByText(option)).toBeInTheDocument();
            unmount();
        }
    });
})

describe('Test suite for functionality of EditSelectBox update function.', () => {
    test('Test that correct data key is returned by function.', () => {
        for (let i = 0; i < 1; i++) {
            //setup
            let  {test_key, test_label } = setup();
            let returned_key = '';
            const test_function = (dataKey, value) => {
                returned_key = dataKey;
            }
            const { unmount } = render(
                <EditSelectBar
                    label={ test_label }
                    dataKey={ test_key }
                    updateFn={ test_function }
                />
            );

            fireEvent.change(screen.getByLabelText(test_label), {target: {value: 2}});
            expect(returned_key).toBe(test_key);
            unmount();
        }
    });

    test('Test that all select bar options return the correct option when selected.', () => {
        let { test_label, test_key, select_cases } = setup();
        for (let i = 0; i < select_cases.length; i++) {
            let returned_value = '';
            const test_function = (dataKey, value) => {
                returned_value = value;
            }
            const { unmount } = render(
                <EditSelectBar
                    label={ test_label }
                    dataKey={ test_key }
                    updateFn={ test_function }
                />
            );
            fireEvent.change(screen.getByLabelText(test_label), {target: {value: select_cases[i]}});
            expect(returned_value).toBe(select_cases[i]);
            unmount();
        }
    });

    test('Test that both key and value are successfully returned for all select bar options and random keys.', () => {
        const { select_cases } = setup();
        for (let j = 0; j < 10; j++) {
            for (let i = 0; i < select_cases.length; i++) {
                let { test_label, test_key } = setup();
                let returned_value = '';
                let returned_key = '';
                const test_function = (dataKey, value) => {
                    returned_key = dataKey;
                    returned_value = value;
                }
                const { unmount } = render(
                    <EditSelectBar
                        label={ test_label }
                        dataKey={ test_key }
                        updateFn={ test_function }
                    />
                );
                fireEvent.change(screen.getByLabelText(test_label), {target: {value: select_cases[i]}});
                expect(returned_key).toBe(test_key),
                expect(returned_value).toBe(select_cases[i]);
                unmount();
            }
        }
    });
});