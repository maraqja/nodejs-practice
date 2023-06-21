import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register - error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: 'a@a.ru', password: '1' });
		expect(res.statusCode).toBe(422);
	});

	it('Login - success', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: '2@mail.ru', password: 'kaka' });
		expect(res.body.jwt).not.toBeUndefined();
	});

	it('Login - error (wrong password)', async () => {
		const res = await request(application.app)
			.post('/users/login')
			.send({ email: '2@mail.ru', password: 'wrong password' });
		expect(res.statusCode).toBe(401);
	});

	it('Info - success', async () => {
		const login = await request(application.app) // перед получением информации нужно залогиниться
			.post('/users/login')
			.send({ email: '2@mail.ru', password: 'kaka' });
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(res.body.email).toBe('2@mail.ru');
	});

	it('Info - error (wrong jwt-token)', async () => {
		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer wrong-token`);
		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
