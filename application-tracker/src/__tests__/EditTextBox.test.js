import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import EditTextBox from '../components/EditTextBox';
import { generateRandomString } from "../javascript/HelperFunctions";

test('EditTextBox renders without crashing.', () => {
    render(<EditTextBox />);
    render(
        <EditTextBox 
            label={ 'test_label' }
            dataKey={ 'test_key '}
            value={ 'test_value' }
            updateFn={ () => {return null;} }
        />
    );
})

describe('Test suite for the display of EditTextBox.', () => {
    test('Tests label text when no input is given.', () => {
        const { container, unmount } = render(<EditTextBox />);
        expect(container).not.toBeEmptyDOMElement();
        
        const inputElement = container.getElementsByClassName('input-label');
        expect(inputElement.item(0).innerHTML).toBe('');
        unmount();
    });

    test('Tests label text is displayed with random inputs.', () => {
        for (let i = 0; i < 10; i++) {
            const randomInputString = generateRandomString();
            const { unmount } = render(<EditTextBox label={ randomInputString } />)
            expect(screen.getByText(randomInputString)).toBeInTheDocument();
            unmount();
        }
    })

    test('Tests default value of input box with no input is given.', () => {
        const { container, unmount } = render(<EditTextBox />);
        expect(container).not.toBeEmptyDOMElement();
        
        const inputElement = container.getElementsByClassName('input-box');
        expect(inputElement.item(0).innerHTML).toBe('');
        unmount();
    });

    test('Tests default value of input box with random inputs.', () => {
        for (let i = 0; i < 10; i++) {
            const randomInputString = generateRandomString();
            const { unmount } = render(<EditTextBox value={ randomInputString } />)
            expect(screen.getByDisplayValue(randomInputString)).toBeInTheDocument();
            unmount();
        }
    });
});

const setup = () => {
    let test_key = generateRandomString();
    let test_label = 'test_label';
    let test_value = generateRandomString();
    let test_default_value = generateRandomString();
    return {
        test_key,
        test_label,
        test_value,
        test_default_value
    }
  }

describe('Test suite for functionality of EditTextBox update function.', () => {
    test('Test that correct data key is returned by function.', () => {
        for (let i = 0; i < 1; i++) {
            //setup
            let  {test_key, test_label } = setup();
            let returned_key = '';
            const test_function = (dataKey, value) => {
                returned_key = dataKey;
            }
            const { unmount } = render(
                <EditTextBox
                    label={ test_label }
                    dataKey={ test_key }
                    updateFn={ test_function }
                />
            );

            fireEvent.change(screen.getByLabelText(test_label), {target: {value: ' '}});
            expect(returned_key).toBe(test_key);
            unmount();
        }
    });

    test('Test that correct value is returned by function.', () => {
        for (let i = 0; i < 10; i++) {
            //setup
            let {test_key, test_label, test_value } = setup();
            let returned_value = '';
            const test_function = (dataKey, value) => {
                returned_value = value;
            }
            const { unmount } = render(
                <EditTextBox
                    label={ test_label }
                    dataKey={ test_key }
                    updateFn={ test_function }
                />
            );

            fireEvent.change(screen.getByLabelText(test_label), {target: {value: test_value}});
            expect(returned_value).toBe(test_value);
            unmount();
        }
    });

    test('Test that the key, value pair is correctly returned by function.', () => {
        for (let i = 0; i < 10; i++) {
            //setup
            let {test_key, test_label, test_value } = setup();
            let returned_key = '';
            let returned_value = '';
            const test_function = (dataKey, value) => {
                returned_key = dataKey;
                returned_value = value;
            }
            const { unmount } = render(
                <EditTextBox
                    label={ test_label }
                    dataKey={ test_key }
                    updateFn={ test_function }
                />
            );

            fireEvent.change(screen.getByLabelText(test_label), {target: {value: test_value}});
            expect(returned_key).toBe(test_key);
            expect(returned_value).toBe(test_value);
            unmount();
        }
    });
    
    test('Test that the input overrides the default value.', () => {
        for (let i = 0; i < 10; i++) {
            //setup
            let {test_key, test_label, test_value, test_default_value } = setup();
            let returned_key = '';
            let returned_value = test_default_value;
            const test_function = (dataKey, value) => {
                returned_key = dataKey;
                returned_value = value;
            }
            const { unmount } = render(
                <EditTextBox
                    label={ test_label }
                    dataKey={ test_key }
                    value={ test_default_value }
                    updateFn={ test_function }
                />
            );

            expect(screen.getByDisplayValue(test_default_value)).toBeInTheDocument();
            fireEvent.change(screen.getByLabelText(test_label), {target: {value: test_value}});
            expect(returned_key).toBe(test_key);
            expect(returned_value).toBe(test_value);
            expect(returned_value).not.toBe(test_default_value);
            unmount();
        }
    });
})