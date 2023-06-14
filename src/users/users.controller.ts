import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { injectable, inject } from 'inversify'
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import 'reflect-metadata' // обязательно добавлять во все места, где есть @injectable() или @inject()
import { IUserController } from "./users.controller.interface";

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService)
		this.bindRoutes([
			{path: '/register', method: 'post', function: this.register},
			{path: '/login', method: 'post', function: this.login}
		])
	}


	login(req: Request, res: Response, next: NextFunction) {
		// this.ok(res, 'login')
		next(new HTTPError(401, 'Login error', 'login'))
	}

	register(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'register')
	}
}