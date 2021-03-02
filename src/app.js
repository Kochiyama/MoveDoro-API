import express from 'express';
import router from './routes';
import path from 'path';
import cors from 'cors';
import './database';

class App {
	constructor() {
		this.server = express();

		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.server.use(express.json());
		this.server.use(
			'/files',
			express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
		);
		this.server.use(cors());
	}

	routes() {
		this.server.use(router);
	}
}

export default new App().server;
