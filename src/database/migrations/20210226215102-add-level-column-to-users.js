'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('users', 'level', {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 1,
		});
	},

	down: async queryInterface => {
		await queryInterface.removeColumn('users', 'level');
	},
};
