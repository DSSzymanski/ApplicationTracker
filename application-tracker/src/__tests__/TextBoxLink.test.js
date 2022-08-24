import React from "react";
import { render, screen } from "@testing-library/react";
import TextBoxLink, { validateHTTP } from "../components/TextBoxLink";

test('TextBoxLink renders without crashing.', () => {
    render(<TextBoxLink />);
    render(<TextBoxLink label='init-label' url='init-url' />);
});

describe('TextBoxLink missing props should not render', () => {
    test('TextBoxLink with no props should not render.', () => {
        const { container } = render(<TextBoxLink />);
        expect(container).toBeEmptyDOMElement();
    });

    test('TextBoxLink with only label should not render.', () => {
        for (let i = 0; i < 10; i += 1) {
            const testLabel = Math.random().toString(36).slice(2);
            const { container } = render(<TextBoxLink label={ testLabel }/>);
            expect(container).toBeEmptyDOMElement();
        }
    })

    test('TextBoxLink with only text should not render.', () => {
        for (let i = 0; i < 10; i += 1) {
            const testUrl = Math.random().toString(36).slice(2);
            const { container } = render(<TextBoxLink text={ testUrl }/>);
            expect(container).toBeEmptyDOMElement();
        }
    })
});

describe('Tests for TextBoxLink http helper function.', () => {
    test('Tests function with working urls that should return as inputed.', () => {
        const test_working_urls = [
            'https://www.google.com',
            'https://jestjs.io/',
            'https://www.reddit.com/',
        ]
        test_working_urls.forEach(url => {
            expect(validateHTTP(url)).toEqual(url);
        })
    })

    test('Tests function with urls missing http or https.', () => {
        //object of base string keys to finish key values
        const test_not_working_urls = {
            'www.google.com': 'http://www.google.com',
            'jestjs.io': 'http://jestjs.io',
            'www.reddit.com': 'http://www.reddit.com',
        }
        for (const [key, value] of Object.entries(test_not_working_urls)) {
            expect(validateHTTP(key)).toEqual(value);
        }
    })

    test('Tests function with random strings.', () => {
        for (let i = 0; i < 10; i += 1) {
            const testUrl = 'www.' + Math.random().toString(36).slice(2) + '.com';
            expect(validateHTTP(testUrl)).toEqual('http://' + testUrl);
        }
    })
})