"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const express_1 = require("express");
class BaseController {
    constructor(logger) {
        this.logger = logger;
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    send(res, code, message) {
        res.type('application/json');
        return res.status(code).json(message);
    }
    ok(res, message) {
        return this.send(res, 200, message);
    }
    bindRoutes(routes) {
        for (const route of routes) {
            this.logger.log(`[${route.method}] - ${route.path}`);
            this.router[route.method](route.path, route.function.bind(this));
        }
    }
}
exports.BaseController = BaseController;
