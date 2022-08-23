import React from "react";
import { render, queryByTestId } from "@testing-library/react";
import TextBox from "../components/TextBox";

test('TextBox renders without crashing.', () => {
    render(<TextBox />);
});

describe('TextBox missing props does not render', () => {
    test('TextBox with no props does not render.', () => {
        const { container } = render(<TextBox />);
        expect(container).toBeEmptyDOMElement();
    });

    test('TextBox with only label does not render.', () => {
        for (let i = 0; i < 10; i += 1) {
            const testLabel = Math.random().toString(36).slice(2);
            const { container } = render(<TextBox label={ testLabel }/>);
            expect(container).toBeEmptyDOMElement();
        }
    })

    test('TextBox with only text does not render.', () => {
        for (let i = 0; i < 10; i += 1) {
            const testText = Math.random().toString(36).slice(2);
            const { container } = render(<TextBox text={ testText }/>);
            expect(container).toBeEmptyDOMElement();
        }
    })
})