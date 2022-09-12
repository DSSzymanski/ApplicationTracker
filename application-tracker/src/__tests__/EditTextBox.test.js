import React from "react";
import { screen, render } from "@testing-library/react";
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

    test('Tests default value of input box with no input is given', () => {
        const { container, unmount } = render(<EditTextBox />);
        expect(container).not.toBeEmptyDOMElement();
        
        const inputElement = container.getElementsByClassName('input-label');
        expect(inputElement.item(0).innerHTML).toBe('');
        unmount();
    })
})