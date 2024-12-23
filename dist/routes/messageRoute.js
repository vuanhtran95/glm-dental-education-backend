"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const authentication_1 = require("../middleware/authentication");
const router = (0, express_1.Router)();
router.post('/', (req, res) => (0, authentication_1.authenticationMiddleware)(req, res, () => (0, messageController_1.messageCreate)(req, res)));
router.post('/:id/feedback', (req, res) => (0, authentication_1.authenticationMiddleware)(req, res, () => (0, messageController_1.messageFeedback)(req, res)));
exports.default = router;
