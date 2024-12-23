"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountController_1 = require("../controllers/accountController");
const router = (0, express_1.Router)();
router.post('/register', accountController_1.accountRegister);
router.post('/login', accountController_1.accountLogin);
exports.default = router;
