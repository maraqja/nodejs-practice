import { Response, Router } from 'express';
import { ExpressReturnType, IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata'; // обязательно добавлять во все места, где есть @injectable() или @inject()

@injectable() // требование invefrsify, базовый класс тоже должен быть инжектбл
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	// public create(res: Response) {
	// 	return res.sendStatus(201)
	// }

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] - ${route.path}`);

			const middleware = route.middlewares?.map((m) => m.execute.bind(m)); // биндим чтобы не потерять контекст

			const pipeline = middleware
				? [...middleware, route.function.bind(this)]
				: route.function.bind(this); // обязательно байндим контекст, т.к. иначе будет ссылаться на контекст route

			this.router[route.method](route.path, pipeline);
		}
	}
}
