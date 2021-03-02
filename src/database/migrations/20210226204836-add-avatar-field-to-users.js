'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('users', 'avatar_id', {
			type: Sequelize.INTEGER,
			references: {
				model: 'files',
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'SET NULL',
			allowNull: false,
			defaultValue: 1,
		});
	},

	down: async queryInterface => {
		await queryInterface.removeColumn('users', 'avatar_id');
	},
};
