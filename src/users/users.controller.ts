import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { HTTPError } from "../errors/http-error.class";

export class UserController extends BaseController {
	constructor(logger: LoggerService) {
		super(logger)
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