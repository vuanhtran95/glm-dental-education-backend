"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoute = exports.dialogRoute = exports.userRoute = exports.scenarioRoute = exports.appRoute = exports.accountRoute = void 0;
const accountRoute_1 = __importDefault(require("./accountRoute"));
exports.accountRoute = accountRoute_1.default;
const appRoute_1 = __importDefault(require("./appRoute"));
exports.appRoute = appRoute_1.default;
const scenarioRoute_1 = __importDefault(require("./scenarioRoute"));
exports.scenarioRoute = scenarioRoute_1.default;
const userRoute_1 = __importDefault(require("./userRoute"));
exports.userRoute = userRoute_1.default;
const dialogRoute_1 = __importDefault(require("./dialogRoute"));
exports.dialogRoute = dialogRoute_1.default;
const messageRoute_1 = __importDefault(require("./messageRoute"));
exports.messageRoute = messageRoute_1.default;
