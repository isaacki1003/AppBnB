'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
	up: (queryInterface, Sequelize) => {
		options.tableName = 'Bookings';
		return queryInterface.bulkInsert(options, [
			{
				spotId: 2,
				userId: 1,
				startDate: '2022-09-28',
				endDate: '2022-10-28'
			},
			{
				spotId: 1,
				userId: 3,
				startDate: '2022-09-10',
				endDate: '2022-10-10'
			},
			{
				spotId: 2,
				userId: 3,
				startDate: '2022-08-28',
				endDate: '2022-09-27'
			},
			{
				spotId: 2,
				userId: 3,
				startDate: '2023-01-01',
				endDate: '2023-01-10'
			}
		]);
	},

	down: (queryInterface, Sequelize) => {
		options.tableName = 'Bookings';
		return queryInterface.bulkDelete(options);
	}
};
