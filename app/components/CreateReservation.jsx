import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import propTypes from 'prop-types';

function CreateReservation({ onSave, cancel }) {
	const save = async (e) => {
		const data = {
			guest: e.target.fullName.value,
			hotel: e.target.hotel.value,
			arrival: e.target.arrivalDate.value,
			departure: e.target.departureDate.value,
		};

		await onSave(data);
	}

    return (
		<Form onSubmit={save} className="reservation-form">
			<Form.Group controlId="fullName">
				<Form.Label>Full Name</Form.Label>
				<Form.Control className="fullname"/>
			</Form.Group>
			<Form.Group controlId="hotel">
				<Form.Label>Hotel</Form.Label>
				<Form.Control as="select" className="hotel">
					<option>Hilton, New Orleans</option>
					<option>Hilton, Dallas</option>
					<option>Hilton, New York</option>
					<option>Hilton, Anchorage</option>
					<option>Hilton, Berlin</option>
				</Form.Control>
			</Form.Group>
			<Form.Group controlId="arrivalDate">
				<Form.Label>Arrival Date</Form.Label>
				<Form.Control type="date" className="arrivalDate"/>
			</Form.Group>
			<Form.Group controlId="departureDate">
				<Form.Label>Departure Date</Form.Label>
				<Form.Control type="date" className="departureDate"/>
			</Form.Group>
			<Button className="cancel" variant="secondary" onClick={cancel} style={{marginRight: "8px", float: "right"}}>
				Cancel
			</Button>
			<Button className="save" variant="primary" type="submit" style={{marginRight: "8px", float: "right"}}>
				Submit
			</Button>
		</Form>
	);
}

CreateReservation.propTypes = {
	onSave: propTypes.func,
	cancel: propTypes.func
};

CreateReservation.defaultProps = {
	onSave: () => {},
	cancel: () => {}
};

export default CreateReservation;
