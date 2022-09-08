import React from "react";
import { render, screen } from "@testing-library/react";
import TextBox from "../components/TextBox";
import { generateRandomString } from "../javascript/HelperFunctions";

test('TextBox renders without crashing.', () => {
    render(<TextBox />);
    render(<TextBox label='init-label' text='init-text' />)
});

describe('TextBox missing props should not render.', () => {
    test('TextBox with no props should not render.', () => {
        const { container } = render(<TextBox />);
        expect(container).toBeEmptyDOMElement();
    });

    test('TextBox with only label should not render.', () => {
        for (let i = 0; i < 10; i += 1) {
            const testLabel = generateRandomString();
            const { container } = render(<TextBox label={ testLabel }/>);
            expect(container).toBeEmptyDOMElement();
        }
    })

    test('TextBox with only text should not render.', () => {
        for (let i = 0; i < 10; i += 1) {
            const testText = generateRandomString();
            const { container } = render(<TextBox text={ testText }/>);
            expect(container).toBeEmptyDOMElement();
        }
    })
})

describe('TextBox successfull implementation with required props.', () => {
    test('TextBox success using random strings.', () => {
        for (let i = 0; i < 10; i += 1) {
            const testLabel = generateRandomString();
            const testText = generateRandomString();
            const { container } = render(
                <TextBox
                    label={ testLabel }
                    text={ testText }
                />
            )
            expect(container).not.toBeEmptyDOMElement();
            expect(screen.getByText(testLabel, {exact:false})).toBeInTheDocument();
            expect(screen.getByText(testText)).toBeInTheDocument();
        }
    })
})

describe('TextBox renders correctly using optional props.', () => {
    test('TextBox renders with correct default class.', () => {
        for (let i = 0; i < 1; i += 1) {
            const testLabel = generateRandomString();
            const testText = generateRandomString();
            const { container } = render(
                <TextBox
                    label={ testLabel }
                    text={ testText }
                />
            )
            //test element
            expect(container.getElementsByClassName('text-box-text').length).toBe(1);
            expect(container.getElementsByClassName('multi-line-text-box').length).toBe(0);
            //test container
            expect(container.getElementsByClassName('text-box-single-line-container').length).toBe(1);
            expect(container.getElementsByClassName('text-box-multi-line-container').length).toBe(0);
        }
    })

    test('TextBox renders correctly when multiline is specified to be false.', () => {
        for (let i = 0; i < 1; i += 1) {
            const testLabel = generateRandomString();
            const testText = generateRandomString();
            const { container } = render(
                <TextBox
                    label={ testLabel }
                    text={ testText }
                    multiline={ false }
                />
            )
            //test element
            expect(container.getElementsByClassName('text-box-text').length).toBe(1);
            expect(container.getElementsByClassName('multi-line-text-box').length).toBe(0);
            //test container
            expect(container.getElementsByClassName('text-box-single-line-container').length).toBe(1);
            expect(container.getElementsByClassName('text-box-multi-line-container').length).toBe(0);
        }
    })

    test('TextBox renders correctly when multiline is specified to be true.', () => {
        for (let i = 0; i < 1; i += 1) {
            const testLabel = generateRandomString();
            const testText = generateRandomString();
            const { container } = render(
                <TextBox
                    label={ testLabel }
                    text={ testText }
                    multiline={ true }
                />
            )
            //test element
            expect(container.getElementsByClassName('text-box-text').length).toBe(0);
            expect(container.getElementsByClassName('multi-line-text-box').length).toBe(1);
            //test container
            expect(container.getElementsByClassName('text-box-single-line-container').length).toBe(0);
            expect(container.getElementsByClassName('text-box-multi-line-container').length).toBe(1);
        }
    })
})