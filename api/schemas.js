import { gql } from 'apollo-server-express';

export default gql`
	scalar Date

	type Reservation {
		id: ID!
		guest: String!
		hotel: String!
		arrival: String!
		departure: String!
	}

	type Query {
		reservation(id: ID!): Reservation
		reservations(skip: Int, take: Int): [Reservation!]
	}

	type Mutation {
		createReservation(guest: String!, hotel: String!, arrival: String!, departure: String!): Reservation!
	}
`;
