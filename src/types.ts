// Символы, по которым будем связывать

export const TYPES = {
	Application: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'),
	UserController: Symbol.for('UserController'),
	UserService: Symbol.for('UserService'),
	ExeptionFilter: Symbol.for('ExeptionFilter'),
};
