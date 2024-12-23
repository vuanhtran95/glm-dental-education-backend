"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
// CORS config
app.use((0, cors_1.default)());
// Parses incoming requests with JSON payloads
app.use(express_1.default.json());
// Parses incoming requests with URL-encoded payloads
app.use(express_1.default.urlencoded({ extended: true }));
(0, database_1.default)();
// User
app.use('/api/accounts', routes_1.accountRoute);
app.use('/api/users', routes_1.userRoute);
app.use('/api/scenarios', routes_1.scenarioRoute);
app.use('/api/dialogs', routes_1.dialogRoute);
app.use('/api/messages', routes_1.messageRoute);
app.use('/', routes_1.appRoute);
// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;
