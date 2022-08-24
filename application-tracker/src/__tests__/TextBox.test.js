import React from "react";
import { render, screen } from "@testing-library/react";
import TextBox from "../components/TextBox";

test('TextBox renders without crashing.', () => {
    render(<TextBox />);
    render(<TextBox label='init-label' text='init-text' />)
});

describe('TextBox missing props should not render', () => {
    test('TextBox with no props should not render.', () => {
        const { container } = render(<TextBox />);
        expect(container).toBeEmptyDOMElement();
    });

    test('TextBox with only label should not render.', () => {
        for (let i = 0; i < 10; i += 1) {
            const testLabel = Math.random().toString(36).slice(2);
            const { container } = render(<TextBox label={ testLabel }/>);
            expect(container).toBeEmptyDOMElement();
        }
    })

    test('TextBox with only text should not render.', () => {
        for (let i = 0; i < 10; i += 1) {
            const testText = Math.random().toString(36).slice(2);
            const { container } = render(<TextBox text={ testText }/>);
            expect(container).toBeEmptyDOMElement();
        }
    })
})

describe('TextBox successfull implementation', () => {
    test('TextBox success using random strings', () => {
        for (let i = 0; i < 10; i += 1) {
            const testLabel = Math.random().toString(36).slice(2);
            const testText = Math.random().toString(36).slice(2);
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