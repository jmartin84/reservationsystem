import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';

// takes a function that accepts the props as an arg so the gql query can react to props
// key is the name of the property passed to the composed component ex. reservations
// selector allows the transformation of the query results before passing it to the composed component
export function WithQuery(queryFn, key = "data", selector = data => data, options = {}) {
	return Component => {
		return props => {
			const { loading, error, data } = useQuery(queryFn(props), options);

			return (
				<Choose>
					<When condition={loading && !data}>
						<Spinner animation="border" role="status">
							<span className="sr-only">Loading...</span>
						</Spinner>
					</When>
					<When condition={error}>
						<span className="error">{error}</span>
					</When>
					<Otherwise>
						<Component { ...{ ...props, [key]: selector(data) } } />
					</Otherwise>
				</Choose>
			);
		}
	}
}

export function WithModal(Component) {
	return ({
		title,
		isOpen,
		...otherProps
	}) => {
		return (
			<Modal
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				show={isOpen}
				centered
			>
				<Modal.Header>
					<Modal.Title id="contained-modal-title-vcenter">
						{title}
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Component {...otherProps}/>
				</Modal.Body>
			</Modal>
		);
	};
}

export function WithDisplayName(name) {
	return (Component) => {
		const wrappedComponent = (props) => {
			return <Component {...props} />
		};

		wrappedComponent.displayName = name;

		return wrappedComponent;
	};
}

export function enhance(Component, ...composables) {
	return composables.reduce((acc, composable) => {
		return composable(acc);
	}, Component);
}
