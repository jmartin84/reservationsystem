import React from 'react';
import { WithQuery, WithModal } from '../../app/Composables.jsx';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import * as hooks from '@apollo/react-hooks';

const TestComponent = () => (
	<span className="test">test</span>
);

describe('withQuery HOC', () => {
	let useQueryStub;

	const TestComponentWithQuery = WithQuery(
		() => {},
		'result'
	)(TestComponent);

	beforeEach(() => {
		useQueryStub = sinon.stub(hooks, 'useQuery');
	});

	afterEach(() => useQueryStub.restore());


	it('should display spinner when loading is true', () => {
		useQueryStub.returns({ loading: true });
		const wrapper = shallow(<TestComponentWithQuery />);

		expect(wrapper.find('.sr-only').exists()).to.be.true;
		expect(wrapper.find('.error').exists()).to.be.false;
	});

	it('should display error when loading is not null', () => {
		const error = 'I am a error';
		useQueryStub.returns({ loading: false, error });

		const wrapper = shallow(<TestComponentWithQuery />);

		expect(wrapper.find('.sr-only').exists()).to.be.false;
		expect(wrapper.find('.error').exists()).to.be.true;

		expect(wrapper.find('.error').text()).to.equal(error);
	});

	it('should render wrapped component with data injected', () => {
		const result = "success";
		useQueryStub.returns({ data: result });

		const wrapper = shallow(<TestComponentWithQuery />);

		expect(wrapper.find('.sr-only').exists()).to.be.false;
		expect(wrapper.find('.error').exists()).to.be.false;

		expect(wrapper.props().result).to.equal(result);
	});
});

describe('WithModal HOC', () => {
	let wrapper;
	const TestComponentWithModal = WithModal(TestComponent);

	beforeEach(() => {
		wrapper = shallow(<TestComponentWithModal isOpen={false} />);
	});

	it('should render', () => {
		wrapper.setProps({ isOpen: true });
		const component = wrapper.find('TestComponent').dive().find('.test');
		expect(component.exists()).to.be.true;
	});
});
