import { gql } from 'apollo-server-express';
import { GraphQLScalarType } from 'graphql';
import moment from 'moment';

import {
	getReservation,
	getReservations,
	createReservation
} from '../lib/queries';

export default {
	Date: new GraphQLScalarType({
		name: "Date",
		description: "A date type",
		parseValue: parseDate,
		parseLiteral: parseDate
	}),
	Query: {
		reservation: getReservation,
		reservations: getReservations
	},
	Mutation: {
		createReservation
	}
}

function parseDate(date) {
	const parsedDate = moment(date.hasOwnProperty('value') ? date.value : date);

	if(!parsedDate.isValid()) {
		throw new Error('Invalid Date');
	}

	// convert to utc then unwrap as string with standardized format
	// if I were doing more operations on these dates downstream
	// then I would probably leave the dates wrapped in the moment object
	return parsedDate.utc().format();
}
