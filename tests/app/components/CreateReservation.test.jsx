import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import CreateReservation from '../../../app/components/CreateReservation'

describe('CreateReservation Component', () => {
	let wrapper;
	let cancelSpy

	beforeEach(() => {
		cancelSpy = sinon.spy();
		wrapper = shallow(<CreateReservation cancel={cancelSpy} />);
	});

	it('should render', () => {
		expect(wrapper.find('.save').exists()).to.be.true;
	});

	it('should close the modal on cancel', () => {
		wrapper.find('.cancel').simulate('click');
		expect(cancelSpy.called).to.be.true;
	});
});
