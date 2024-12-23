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
exports.accountLogin = exports.accountRegister = void 0;
const env_1 = __importDefault(require("../config/env"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const account_1 = __importDefault(require("../models/account"));
const models_1 = require("../models");
/**
 * Register account: create account and user link to account
 * @param req
 * @param res
 */
const accountRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role, fullName } = req.body;
    try {
        const newAccount = new account_1.default({ username, password });
        yield newAccount.save();
        const newUser = new models_1.User({ accountId: newAccount._id, role, fullName });
        const savedUser = yield newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        const error = err;
        console.log(error, 'error');
        res.status(400).json({ error: error.errmsg });
    }
});
exports.accountRegister = accountRegister;
const accountLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const account = yield account_1.default.findOne({ username });
        if (!account || !(yield bcrypt_1.default.compare(password, account.password))) {
            res.status(401).send('Invalid login credentials');
            return;
        }
        const token = jsonwebtoken_1.default.sign({ _id: account._id }, env_1.default.jwtSecret, {
            expiresIn: '24h',
        });
        res.send({ token });
        return;
    }
    catch (error) {
        console.log(error, 'error');
        res.status(401).send('Unauthorised');
    }
});
exports.accountLogin = accountLogin;
