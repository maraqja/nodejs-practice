// Точка входа

import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ExeptionFilter } from "./errors/exeption.filter";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { IExceptionFilter } from "./errors/exeption.filter.interface";
import { IUserController } from "./users/users.controller.interface";


	export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
		bind<ILogger>(TYPES.ILogger).to(LoggerService) 
		bind<IExceptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter) 
		bind<IUserController>(TYPES.UserController).to(UserController) 
		bind<App>(TYPES.Application).to(App)
	}) // биндинги всего приложения

	function bootstrap() {
		const appContainer = new Container() // создаем IoC контейнер - там хранятся все биндинги символов на конкретные реализации для того чтобы переиспользовать
		appContainer.load(appBindings)
		const app = appContainer.get<App>(TYPES.Application)
		app.init()
		return { appContainer, app }
	}
	
export const { app, appContainer } = bootstrap() 
	





