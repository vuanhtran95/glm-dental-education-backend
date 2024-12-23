"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGet = exports.userCreate = void 0;
const user_1 = __importDefault(require("../models/user"));
const account_1 = __importDefault(require("../models/account"));
const env_1 = __importDefault(require("../config/env"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const userCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountId, role, fullName } = req.body;
    // Check if accountId is existed
    try {
        yield account_1.default.findById(accountId);
    }
    catch (err) {
        const error = err;
        res.status(400).json({ error: 'Account Id is invalid' });
        return;
    }
    // Create user link to account
    try {
        const newUser = new user_1.default({ accountId, role, fullName });
        const savedUser = yield newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        const error = err;
        res.status(400).json({ error: error.errmsg });
    }
});
exports.userCreate = userCreate;
const userGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.replace('Bearer ', '');
    if (!!token) {
        jsonwebtoken_1.default.verify(token, env_1.default.jwtSecret, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err && !decoded) {
                res.status(403);
                return;
            }
            const decodedData = decoded;
            try {
                const user = yield user_1.default.findOne({
                    accountId: decodedData === null || decodedData === void 0 ? void 0 : decodedData._id,
                });
                if (!user) {
                    res.status(404).json(constants_1.ERROR_RESPONSE.RECORD_NOT_FOUND);
                    return;
                }
                res.status(200).json({ user: user });
                return;
            }
            catch (error) {
                res.status(500).json(constants_1.ERROR_RESPONSE.RECORD_NOT_FOUND);
                return;
            }
        }));
        return;
    }
    res.send(400).json(constants_1.ERROR_RESPONSE.INVALID_TOKEN);
    return;
});
exports.userGet = userGet;
