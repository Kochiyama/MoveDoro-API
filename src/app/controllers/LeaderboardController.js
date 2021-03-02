import User from '../models/User';
import File from '../models/File';

class LeaderboardController {
	async show(req, res) {
		const users = await User.findAll({
			attributes: [
				'name',
				'level',
				'current_experience',
				'challenges_completed',
			],
			include: {
				model: File,
				as: 'avatar',
				attributes: ['name', 'path', 'url'],
			},
			order: [
				['level', 'DESC'],
				['current_experience', 'DESC'],
			],
			limit: 10,
		});
		return res.json(users);
	}
}

export default new LeaderboardController();
