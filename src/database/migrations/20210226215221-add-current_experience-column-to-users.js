'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('users', 'current_experience', {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 0,
		});
	},

	down: async queryInterface => {
		await queryInterface.removeColumn('users', 'current_experience');
	},
};
