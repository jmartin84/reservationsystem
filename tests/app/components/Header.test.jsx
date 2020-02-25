import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import Header from '../../../app/components/Header'

describe('Header Component', () => {
	let wrapper;
	let openSpy;

	beforeEach(() => {
		openSpy = sinon.spy();
		wrapper = shallow(<Header openReservationModal={openSpy} />);
	});

	it('should render', () => {
		expect(wrapper.find('Navbar').exists()).to.be.true;
	});

	it('should open reservation modal when add button is clicked', () => {
		wrapper.find('Button').simulate('click');
		expect(openSpy.called).to.be.true;
	});
});
