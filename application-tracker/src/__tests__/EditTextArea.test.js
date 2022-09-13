import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import EditTextArea from '../components/EditTextArea';
import { generateRandomString } from "../javascript/HelperFunctions";

test('EditTextArea renders without crashing.', () => {
    render(<EditTextArea />);
    render(
        <EditTextArea
            label={ 'test_label' }
            dataKey={ 'test_key '}
            value={ 'test_value' }
            updateFn={ () => {return null;} }
        />
    );
});

describe('Test suite for the display of EditTextArea.', () => {
    test('Tests label text when no input is given.', () => {
        const { container } = render(<EditTextArea />);
        expect(container).not.toBeEmptyDOMElement();
        expect(container.getElementsByClassName('text-box-label').item(0).innerHTML).toBe('');
    });

    test('Tests label text is displayed with random inputs.', () => {
        for (let i = 0; i < 10; i++) {
            const randomInputString = generateRandomString();
            const { unmount } = render(<EditTextArea label={ randomInputString } />)
            expect(screen.getByText(randomInputString)).toBeInTheDocument();
            unmount();
        }
    })

    test('Tests default value of input box with no input is given.', () => {
        const { container, unmount } = render(<EditTextArea />);
        expect(container).not.toBeEmptyDOMElement();
        expect(container.getElementsByClassName('text-area-box').item(0).innerHTML).toBe('');
        unmount();
    });

    test('Tests default value of input box with random inputs.', () => {
        for (let i = 0; i < 10; i++) {
            const randomInputString = generateRandomString();
            const { unmount } = render(<EditTextArea value={ randomInputString } />)
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

describe('Test suite for functionality of EditTextArea update function.', () => {
    test('Test that correct data key is returned by function.', () => {
        for (let i = 0; i < 1; i++) {
            //setup
            let  {test_key, test_label } = setup();
            let returned_key = '';
            const test_function = (dataKey, value) => {
                returned_key = dataKey;
            }
            const { unmount } = render(
                <EditTextArea
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
                <EditTextArea
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
                <EditTextArea
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
                <EditTextArea
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
