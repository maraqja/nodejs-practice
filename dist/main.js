"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.appContainer = exports.app = exports.appBindings = void 0;
const inversify_1 = require("inversify");
const app_1 = require("./app");
const exeption_filter_1 = require("./errors/exeption.filter");
const logger_service_1 = require("./logger/logger.service");
const users_controller_1 = require("./users/users.controller");
const types_1 = require("./types");
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.ILogger).to(logger_service_1.LoggerService);
    bind(types_1.TYPES.ExeptionFilter).to(exeption_filter_1.ExeptionFilter);
    bind(types_1.TYPES.UserController).to(users_controller_1.UserController);
    bind(types_1.TYPES.Application).to(app_1.App);
});
function bootstrap() {
    const appContainer = new inversify_1.Container();
    appContainer.load(exports.appBindings);
    const app = appContainer.get(types_1.TYPES.Application);
    app.init();
    return { appContainer, app };
}
_a = bootstrap(), exports.app = _a.app, exports.appContainer = _a.appContainer;
//# sourceMappingURL=main.js.map