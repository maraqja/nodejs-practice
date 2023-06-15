import express, { Express } from 'express';
import { Server } from 'http';
import { UserController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { inject, injectable } from 'inversify';
import 'reflect-metadata'; // обязательно добавлять во все места, где есть @injectable() или @inject()
import { json } from 'body-parser';
import { ConfigService } from './config/config.service';
import { IExceptionFilter } from './errors/exeption.filter.interface';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleWare } from './common/auth.middleware';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json()); // гглобально для всего приложения указываем что body запросов парсим в JSON
		const authMiddleWare = new AuthMiddleWare(this.configService.get('JWT_SECRET'));
		this.app.use(authMiddleWare.execute.bind(authMiddleWare));
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server started on localhost:${this.port}`);
	}
}
