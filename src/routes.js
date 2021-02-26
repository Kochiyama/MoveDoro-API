import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';

const router = new Router();

const upload = multer(multerConfig);

router.get('/users', UserController.show);
router.post('/users', UserController.create);
router.post('/files', upload.single('file'), FileController.create);

export default router;
