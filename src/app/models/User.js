import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.INTEGER,
				email: Sequelize.STRING,
				password: Sequelize.VIRTUAL,
				password_hash: Sequelize.STRING,
				level: Sequelize.INTEGER,
				current_experience: Sequelize.INTEGER,
				challenges_completed: Sequelize.INTEGER,
			},
			{
				sequelize,
			}
		);

		this.addHook('beforeSave', async user => {
			if (user.password) {
				user.password_hash = await bcrypt.hash(user.password, 8);
			}
		});

		return this;
	}

	static associate(models) {
		this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
	}

	checkPassword(password) {
		return bcrypt.compare(password, this.password_hash);
	}
}

export default User;
