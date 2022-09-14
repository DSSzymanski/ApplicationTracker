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
    })
})

