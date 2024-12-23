"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authentication_1 = require("../middleware/authentication");
const router = (0, express_1.Router)();
router.get('/', (req, res) => (0, authentication_1.authenticationMiddleware)(req, res, () => (0, userController_1.userGet)(req, res)));
exports.default = router;
