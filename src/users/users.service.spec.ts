import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { IUserService } from './user.service.interface';
import { TYPES } from '../types';
import { UserService } from './users.service';
import { User } from './user.entity';
import { UserModel } from '@prisma/client';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

let createdUser: UserModel | null;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUserService>(TYPES.UserService);
});

describe('User Service', () => {
	it('createUser', async () => {
		// в начале описываем все нужные в этой функции моки
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		// find не мокаем, т.к. пусть он возвращает undefined

		// далее вызываем функцию, которая использует все вызванные моки
		createdUser = await usersService.createUser({
			email: 'a@a.ru',
			name: 'Anton',
			password: 'qwe',
		});

		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1'); // т.к. зашифрованный должен быть
	});

	it('validateUser - success', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const res = await usersService.validateUser({
			email: 'a@a.ru',
			password: 'qwe',
		});
		expect(res).toBeTruthy();
	});

	it('validateUser - wrong password', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const res = await usersService.validateUser({
			email: 'a@a.ru',
			password: 'wrong pass',
		});
		expect(res).toBeFalsy();
	});

	it('validateUser - wrong email', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);

		const res = await usersService.validateUser({
			email: 'wrong email',
			password: 'qwe',
		});
		expect(res).toBeFalsy();
	});
});
