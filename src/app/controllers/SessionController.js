import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
	async create(req, res) {
		const schema = Yup.object().shape({
			email: Yup.string().email().required(),
			password: Yup.string().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({
				title: 'Dados inválidos',
				message: 'Verifique o email e a senha digitados.',
			});
		}

		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(401).json({
				title: 'Email não registrado',
				message: 'Crie sua conta gratuitamente.',
			});
		}

		if (!(await user.checkPassword(password))) {
			return res.status(401).json({
				title: 'Senha incorreta',
				message: 'Esqueceu a senha? clique no link no final da pagina.',
			});
		}

		const { id, name } = user;

		return res.json({
			user: {
				id,
				name,
				email,
			},

			token: jwt.sign({ id }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		});
	}
}

export default new SessionController();
