import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Не соответствует формату e-mail' })
	email: string;

	@IsString()
	password: string;
}
