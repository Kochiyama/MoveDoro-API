import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import LeaderboardController from './app/controllers/LeaderboardController';

const router = new Router();

const upload = multer(multerConfig);

router.get('/', (req, res) => {
	return res.json({ ok: true });
});

// public
router.post('/sessions', SessionController.create);
router.post('/users', UserController.create);

// set up authentication
router.use(authMiddleware);

// auth required
router.get('/users', UserController.show);
router.put('/users', UserController.update);
router.post('/files', upload.single('file'), FileController.create);
router.get('/leaderboard', LeaderboardController.show);

export default router;
