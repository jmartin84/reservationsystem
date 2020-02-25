import React from 'react';
import { Table, Dropdown, DropdownButton } from 'react-bootstrap';
import moment from 'moment';
import propTypes from 'prop-types';

function Reservations({ reservations, setNumberOfResults, numberOfResults }) {
    const rows = reservations.map((row, index) => (
		<tr key={row.id}>
			<td>{index + 1}</td>
			<td>{row.guest}</td>
			<td>{row.hotel}</td>
			<td>{moment(row.arrival).format("MM/DD/YYYY")}</td>
			<td>{moment(row.departure).format("MM/DD/YYYY")}</td>
		</tr>
	));

	return (
		<>
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Guest Name</th>
						<th>Hotel</th>
						<th>Arrival Date</th>
						<th>Departure Date</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</Table>
			<DropdownButton
				id="number-of-results-dropdown"
				title={`Showing ${numberOfResults < 0 ? 'all' : numberOfResults} results`}
				variant="secondary"
				className=""
				style={{float: 'right', marginRight: '5px'}}
			>
				<Dropdown.Item onSelect={() => setNumberOfResults(10)}>10</Dropdown.Item>
				<Dropdown.Item onSelect={() => setNumberOfResults(20)}>20</Dropdown.Item>
				<Dropdown.Item onSelect={() => setNumberOfResults(30)}>30</Dropdown.Item>
				<Dropdown.Item onSelect={() => setNumberOfResults(-1)}>All</Dropdown.Item>
			</DropdownButton>
		</>
	);
}

Reservations.propTypes = {
	reservations: propTypes.arrayOf(propTypes.shape({
		id: propTypes.string.isRequired,
		guest: propTypes.string.isRequired,
		hotel: propTypes.string.isRequired,
		arrival: propTypes.string.isRequired,
		departure: propTypes.string.isRequired,
	})),
    setNumberOfResults: propTypes.func
};

Reservations.defaultProps = {
	reservations: [],
    setNumberOfResults: () => {}
};

export default Reservations;
