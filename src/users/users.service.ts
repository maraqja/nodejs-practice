import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name); // создаем инстанс пользователя через Entity
		const salt = this.configService.get('SALT');
		console.log(salt);
		await newUser.setPassword(password, Number(salt)); // вызываем метод в entity
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}
		// проверка что он есть
		// если есть - возвращаем null
		// если нет - создаем
		return this.usersRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			// обрабатываем undefined на который ругается в следующей строки (после условного блока где const newUser = ....)
			return false;
		}
		const newUser = new User(existedUser?.email, existedUser?.name, existedUser.password);
		return newUser.comparePassword(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email);
	}
}
