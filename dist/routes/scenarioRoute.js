"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scenarioController_1 = require("../controllers/scenarioController");
const authentication_1 = require("../middleware/authentication");
const router = (0, express_1.Router)();
router.post("/generate", (req, res) => (0, authentication_1.authenticationMiddleware)(req, res, () => (0, scenarioController_1.generateScenario)(req, res)));
exports.default = router;
