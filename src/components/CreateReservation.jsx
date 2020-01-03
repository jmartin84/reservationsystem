import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import propTypes from 'prop-types';

function CreateReservation({ saveReservation, cancel }) {
	const save = async (e) => {
		const data = {
			guest: e.target.fullName.value,
			hotel: e.target.hotel.value,
			arrival: e.target.arrivalDate.value,
			departure: e.target.departureDate.value,
		};

		await saveReservation(data);
	}

    return (
		<Form onSubmit={save}>
			<Form.Group controlId="fullName">
				<Form.Label>Full Name</Form.Label>
				<Form.Control />
			</Form.Group>
			<Form.Group controlId="hotel">
				<Form.Label>Hotel</Form.Label>
				<Form.Control as="select">
					<option>Hilton, New Orleans</option>
					<option>Hilton, Dallas</option>
					<option>Hilton, New York</option>
					<option>Hilton, Anchorage</option>
					<option>Hilton, Berlin</option>
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="arrivalDate">
				<Form.Label>Arrival Date</Form.Label>
				<Form.Control type="datetime-local"/>
			</Form.Group>
			<Form.Group controlId="departureDate">
				<Form.Label>Departure Date</Form.Label>
				<Form.Control type="datetime-local"/>
			</Form.Group>
			<Button variant="secondary" onClick={cancel} style={{marginRight: "8px", float: "right"}}>
				Cancel
			</Button>
			<Button variant="primary" type="submit" style={{marginRight: "8px", float: "right"}}>
				Submit
			</Button>
		</Form>
	);
}

CreateReservation.propTypes = {
	saveReservation: propTypes.func,
	cancel: propTypes.func
};

CreateReservation.defaultProps = {
	saveReservation: () => {},
	cancel: () => {}
};

export default CreateReservation;
