import { hash } from 'bcryptjs';

// ЭТО ЭНТИТИ, ОНО ИСПОЛЬЗУЕТСЯ ДЛЯ ИНКАПСУЛЯЦИИ БИЗНЕС-ЛОГИКИ, которая относится к конкретной сущности
// ЭНТИТИ МАКСИМАЛЬНО ОТДЕЛЕНО ОТ ДРУГИХ ЧАСТЕЙ СИСТЕМЫ (ИЗОЛИРОВАНО), МОЖЕТ СОДЕРЖАТЬ НАБОРЫ ПОЛЕЗНЫХ МЕТОДОВ ДЛЯ РАБОТЫ С ПОЛЯМИ СУЩНОСТИ, ГЕТТЕРОВ И СЕТТЕРОВ
export class User {
	private _password: string; // не передаем в конструктор, т.к. хранить их в бд будем в захешированном виде

	constructor(private readonly _email: string, private readonly _name: string) {}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(password: string): Promise<void> {
		// не делаем обычным сеттером, тк обычные сеттеры не могут быть асинхронными
		this._password = await hash(password, 10);
	}
}
