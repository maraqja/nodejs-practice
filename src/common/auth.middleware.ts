import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from './middleware.interface';
import { JwtPayload, verify } from 'jsonwebtoken';

export class AuthMiddleWare implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		// тут по сути если у нас есть токен и он валидный, то к запросу добавляем поле user, которое равное пейлоаду токена (точнее email, т.к. там еще iat есть)
		if (req.headers.authorization) {
			// Bearer - JWT_TOKEN

			const token = req.headers.authorization.split(' ')[1]; // убираем Bearer
			verify(token, this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					// console.log(payload);
					req.user = (payload as JwtPayload).email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
