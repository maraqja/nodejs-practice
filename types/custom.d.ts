declare namespace Express {
	// дополняем дефолтный интерфейс Express
	export interface Request {
		user: string;
	}
}
