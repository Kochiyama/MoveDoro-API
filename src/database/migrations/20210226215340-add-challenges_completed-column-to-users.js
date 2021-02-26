'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('users', 'challenges_completed', {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		});
	},

	down: async queryInterface => {
		await queryInterface.removeColumn('users', 'challenges_completed');
	},
};
