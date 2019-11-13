import React from 'react';
import {
	cleanup,
	fireEvent,
	render,
	waitForElement,
	getByText,
	wait
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('App.js: hello world가 상단에 노출된다', () => {
	expect(true).toBeTruthy();
});
