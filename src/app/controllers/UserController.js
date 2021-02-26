import User from '../models/User';
import * as Yup from 'yup';
import File from '../models/File';

class UserController {
	async show(req, res) {
		const user = await User.findOne({
			where: {
				id: req.userId,
			},
			attributes: [
				'email',
				'name',
				'level',
				'current_experience',
				'challenges_completed',
			],
			include: [
				{
					model: File,
					as: 'avatar',
					attributes: ['name', 'path', 'url'],
				},
			],
		});

		return res.json(user);
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
			level: Yup.number(),
			current_experience: Yup.number(),
			challenges_completed: Yup.number(),
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

		const {
			id,
			name,
			avatar_id,
			level,
			current_experience,
			challenges_completed,
		} = await user.update(req.body);

		return res.json({
			id,
			name,
			email,
			avatar_id,
			level,
			current_experience,
			challenges_completed,
		});
	}
}

export default new UserController();
