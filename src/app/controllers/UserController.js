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

	async update(req, res) {
		const schema = Yup.object().shape({
			email: Yup.string().email().required(),
			name: Yup.string(),
			oldPassword: Yup.string(),
			password: Yup.string()
				.min(6)
				.when('oldPassword', (oldPassword, field) => {
					oldPassword ? field.required() : field;
				}),
			passwordConfirmation: Yup.string()
				.min(6)
				.when('password', (password, field) => {
					password ? field.required().oneOf([Yup.ref('password')]) : field;
				}),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Data validation failed.' });
		}

		const { email, oldPassword } = req.body;

		const user = await User.findByPk(req.userId);

		if (user.email !== email) {
			const emailAlreadyUsed = await User.findOne({ where: { email } });

			if (emailAlreadyUsed) {
				return res.status(401).json({ error: 'Email already registered' });
			}
		}

		if (oldPassword && !(await user.checkPassword(oldPassword))) {
			return res.status(401).json({ error: 'Password does not match' });
		}

		const { id, name, avatar_id } = await user.update(req.body);

		return res.json({
			id,
			name,
			email,
			avatar_id,
		});
	}
}

export default new UserController();
