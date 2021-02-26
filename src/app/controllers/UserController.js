import User from '../models/User';

class UserController {
	async create(req, res) {
		const emailAlreadyRegistered = await User.findOne({
			where: { email: req.body.email },
		});

		if (emailAlreadyRegistered) {
			return res.status(400).json({ error: 'Email already registered.' });
		}

		const { id, name, email } = await User.create(req.body);

		return res.json({
			id,
			name,
			email,
		});
	}
}

export default new UserController();
