import React, { useState } from 'react';
import { gql } from 'apollo-boost';

import Header from '../components/Header.jsx';
import { enhance, WithModal, WithQuery, WithDisplayName } from '../Composables.jsx';
import { useMutation } from '@apollo/react-hooks';
import CreateReservation from '../components/CreateReservation.jsx';
import Reservations from '../components/Reservations.jsx';

const CreateReservationWithModal = enhance(
	CreateReservation,
	WithModal,
	WithDisplayName('CreateReservationModal')
);

const ReservationQuery = WithQuery(({skip=0, numberOfResults=10}) => gql`
		query {
			reservations(skip: ${skip}, take: ${numberOfResults}) {
				id
				guest
				hotel
				arrival
				departure
			}
		}
	`,
	'reservations',
	({ reservations }) => reservations
);

const ReservationsWithQuery = enhance(
	Reservations,
	ReservationQuery,
	WithDisplayName('Reservations')
);

function ReservationDashboard() {
	const [
		isReservationModalOpen,
		setReservationModalState
	] = useState(false);

	const [
		numberOfResults,
		setNumberOfResults
	] = useState(10);

	const [saveReservation,] = useMutation(
		gql`
			mutation CreateReservation($guest: String!, $hotel: String!, $arrival: String!, $departure: String!) {
				createReservation(guest: $guest, hotel: $hotel, arrival: $arrival, departure: $departure) {
					guest
					hotel
					arrival
					departure
					id
				}
			}
		`
	);

	const openReservationModal = () => setReservationModalState(true);
	const closeReservationModal = () => setReservationModalState(false);

	const addReservation = async (reservation) => {
		await saveReservation({ variables: reservation });
		closeReservationModal();
	};

	return (
		<>
			<Header openReservationModal={openReservationModal} />
			<ReservationsWithQuery
				setNumberOfResults={setNumberOfResults}
				numberOfResults={numberOfResults}
			/>
			<CreateReservationWithModal
				title="Book your reservation!"
				cancel={closeReservationModal}
				isOpen={isReservationModalOpen}
				onSave={addReservation}
			/>
		</>
	);
}

export default ReservationDashboard;
