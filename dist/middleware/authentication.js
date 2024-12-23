"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const constants_1 = require("../constants");
const authenticationMiddleware = (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json(constants_1.ERROR_RESPONSE.INVALID_TOKEN);
    }
    const token = authorizationHeader.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json(constants_1.ERROR_RESPONSE.TOKEN_NOT_FOUND);
    }
    try {
        jsonwebtoken_1.default.verify(token, env_1.default.jwtSecret || '');
        next();
    }
    catch (err) {
        console.error(err);
        return res.status(401).json(constants_1.ERROR_RESPONSE.INVALID_TOKEN);
    }
};
exports.authenticationMiddleware = authenticationMiddleware;
