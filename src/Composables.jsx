import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';

// takes a function that accepts the props as an arg so the gql query can react to props
// key is the name of the property passed to the composed component ex. reservations
// selector allows the transformation of the query results before passing it to the composed component
export function WithQuery(Component, queryFn, key = "data", selector = data => data, options = {}) {
	return (props) => {
		const { loading, error, data } = useQuery(queryFn(props), options);

		return (
			<Choose>
				<When condition={loading}>
					<Spinner animation="border" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</When>
				<When condition={error}>
					<span>Error: {error}</span>
				</When>
				<Otherwise>
					<Component { ...{ ...props, [key]: selector(data) } } />
				</Otherwise>
			</Choose>
		);
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
