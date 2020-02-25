import {
	getReservation,
	getReservations,
	createReservation
} from '../lib/queries';

export default {
	Query: {
		reservation: getReservation,
		reservations: getReservations
	},
	Mutation: {
		createReservation
	}
}
