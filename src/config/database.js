module.exports = {
	dialect: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: 'docker',
	database: 'movedoro-db',
	define: {
		timestamps: true,
		underscored: true,
		underscoredAll: true,
	},
};
