import { find, findOne, create } from './db';

export async function getReservation(parent, { id }) {
	const result = await findOne({ _id: id });

	return { ...result, id: result._id };
}

export async function getReservations(parent, { skip = 0, take = 10 }) {
	const result = await find({}, skip, take);

	return result.map(item => ({ ...item, id: item._id }));
}

export async function createReservation(parent, data) {
	// todo in a real system we'd do thing like validate
	// that the duration of the stay were valid
	const result = await create(data);

	return { ...result, id: result._id };
}
