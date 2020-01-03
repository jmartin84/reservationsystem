import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import propTypes from 'prop-types';

const { Brand } = Navbar;

function Header({ openReservationModal }) {
	return (
		<Navbar
			bg="dark"
			expand="lg"
			variant="dark"
			className="row justify-content-between"
		>
			<Brand className="col-1">Reservation System</Brand>
			<Button variant="primary" type="button" onClick={openReservationModal}>Add</Button>
		</Navbar>
    );
}

Header.propTypes = {
    openReservationModal: propTypes.func
}

Header.defaultProps = {
    openReservationModal: () => {}
}

export default Header;
