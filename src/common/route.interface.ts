import { NextFunction, Request, Response, Router } from "express";

export interface IControllerRoute {
	path: string,
	function: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'put' | 'patch'> // Pick берет только некоторые поля и создает из них новый интерфейс
	// method: 'get' | 'post' | 'delete' | 'put' | 'patch'
}