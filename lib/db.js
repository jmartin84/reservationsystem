import DataStore from 'nedb';
import { join } from 'path';
import Bluebird from 'bluebird';

const db = new DataStore({
	filename: join(__dirname, '..', 'data/reservations.db'),
	autoload: true
});

export async function create(data) {
	return new Bluebird((resolve, reject) => {
		db.insert(data, (err, response) => {
			if(err) {
				reject(err);
				return
			}

			resolve(response);
			return;
		});
	});
}

export async function findOne(data) {
	return new Bluebird((resolve, reject) => {
		db.findOne(data, (err, response) => {
			if(err) {
				reject(err);
				return
			}

			resolve(response);
			return;
		});
	});
}

export async function find(data, skip, take) {
	return new Bluebird((resolve, reject) => {
		let query = db
			.find(data)
			.skip(skip);

		if(take > 0) {
			query = query.limit(take);
		}

		query.exec((err, response) => {
			if(err) {
				reject(err);
				return
			}

			resolve(response);
			return;
		});
	});
}
