import User from '../models/User';
import * as Yup from 'yup';

class UserController {
	async show(req, res) {
		const users = await User.findAll();
		return res.json(users);
	}

	async create(req, res) {
		const schema = Yup.object().shape({
			email: Yup.string().email().required(),
			name: Yup.string().required(),
			password: Yup.string().required().min(6),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Data validation failed.' });
		}

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
