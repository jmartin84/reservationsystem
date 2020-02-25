import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Reservations from '../../../app/components/Reservations'

const reservations = [{
		id: '1',
		guest: 'test1',
		hotel: 'hilton',
		arrival: '2020-10-20',
		departure: '2020-10-25'
	}, {
		id: '2',
		guest: 'test2',
		hotel: 'hilton',
		arrival: '2020-05-20',
		departure: '2020-06-11'
	}
];

describe('Reservations Component', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(
			<Reservations reservations={reservations}/>
		);
	});

	it('should render', () => {
		expect(wrapper.find('tr').length).to.equal(3)
		expect(wrapper.find('thead').exists()).to.be.true;
	});
});
