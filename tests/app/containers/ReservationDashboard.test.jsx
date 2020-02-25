
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import * as hooks from '@apollo/react-hooks';

import ReservationDashboard from '../../../app/containers/ReservationDashboard';

const reservations = [{
		id: 1,
		guest: 'test1',
		hotel: 'hilton',
		arrival: '2020-10-20',
		departure: '2020-10-25'
	}, {
		id: 2,
		guest: 'test2',
		hotel: 'hilton',
		arrival: '2020-05-20',
		departure: '2020-06-11'
	}
];

describe('ReservationDashboard Component', () => {
	let wrapper;
	let useQueryStub;
	let useMutationStub;
	let saveReservationSpy;

	beforeEach(() => {
		saveReservationSpy = sinon.spy();
		useMutationStub = sinon
			.stub(hooks, 'useMutation')
			.returns([saveReservationSpy, null]);

		useQueryStub = sinon
			.stub(hooks, 'useQuery')
			.returns({ reservations });

		wrapper = shallow(
			<ReservationDashboard />
		);
	});

	afterEach(() => {
		useQueryStub.restore();
		useMutationStub.restore();
	});

	it('should render', () => {
		console.log(wrapper.debug());
		expect(wrapper.find('Header').exists()).to.be.true;
	});
});
