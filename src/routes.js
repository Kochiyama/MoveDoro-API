import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const router = new Router();

const upload = multer(multerConfig);

// temp
router.get('/users', UserController.show);

// public
router.post('/sessions', SessionController.create);
router.post('/users', UserController.create);

// auth required
router.post('/files', upload.single('file'), FileController.create);

export default router;
