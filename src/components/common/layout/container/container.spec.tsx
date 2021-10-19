import { shallow } from 'enzyme';
import React from 'react';
import Container from './container';

describe('[COMPONENT]: Container', () => {
	const createWrapper = (props?: any) => {
		return shallow(<Container {...props} />);
	}
	it('should render a div with className "container"', () => {
		const wrapper = createWrapper();

		expect(wrapper.find('div.container').length).toBe(1);
	});

	it('should apply any classes passed as props to the container div', () => {
		const wrapper = createWrapper({ className: 'test-class' });

		expect(wrapper.find('div.container').hasClass('test-class')).toBe(true);
	});
})
