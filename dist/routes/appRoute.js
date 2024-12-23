"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const router = (0, express_1.Router)();
const swaggerDocument = yamljs_1.default.load('./swagger.yaml');
const helloWorldFn = (_, res) => {
    res.send('Hello World!');
};
router.get('/', (req, res) => helloWorldFn(req, res));
// Swagger
router.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
exports.default = router;
