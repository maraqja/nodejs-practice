import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';

export class AuthGuard implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user) {
			// типа если у нас есть токен: т.к. у req поле user только тогда, когда есть токен при запросе и он валидный
			return next();
		}
		res.status(401).send({ error: 'Вы не авторизованы' }); // и не вызываем next(), т.к. обработка запроса далее запрещена
	}
}
