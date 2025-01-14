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
exports.dialogFeedback = exports.dialogSubmit = exports.dialogEnd = exports.dialogGetDetail = exports.dialogGetList = exports.dialogCreate = void 0;
const mongodb_1 = require("mongodb");
const dialog_1 = __importDefault(require("../models/dialog"));
const models_1 = require("../models");
const message_1 = require("../types/message");
const utils_1 = require("../utils");
const dialogCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { createdUserId, scenarioId } = req.body;
    try {
        const dialog = new dialog_1.default({
            createdUserId,
            scenarioId,
        });
        const savedDialog = yield dialog.save();
        // Create context for dialog based on scenario
        const scenario = yield models_1.Scenario.findById(scenarioId);
        if (!scenario) {
            res.status(404);
            return;
        }
        const systemContextMessage = new models_1.Message({
            role: message_1.EMessageRole.SYSTEM,
            content: (0, utils_1.buildDialogContext)(scenario),
            dialogId: savedDialog._id,
        });
        yield systemContextMessage.save();
        res.status(201).json(savedDialog);
    }
    catch (err) {
        const error = err;
        res.status(400).json({ error: error.errmsg });
    }
});
exports.dialogCreate = dialogCreate;
const dialogGetList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const id = userId;
    try {
        const dialogs = yield dialog_1.default.aggregate([
            {
                $match: userId
                    ? { createdUserId: userId ? new mongodb_1.ObjectId(id) : "" }
                    : { isSubmitted: true },
            },
            {
                $lookup: {
                    from: "scenarios",
                    localField: "scenarioId",
                    foreignField: "_id",
                    as: "scenario",
                },
            },
            {
                $unwind: "$scenario",
            },
            {
                $lookup: {
                    from: "users",
                    localField: "createdUserId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: "$user",
            },
            { $sort: { createdAt: -1 } },
        ]);
        res.status(200).json({ dialogs });
    }
    catch (err) {
        const error = err;
        res.status(400).json({ error: error.errmsg });
    }
});
exports.dialogGetList = dialogGetList;
const dialogGetDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        res.status(400).json({ error: "Id not found" });
    try {
        const dialog = yield dialog_1.default.findById(id);
        const scenario = yield models_1.Scenario.findById(dialog === null || dialog === void 0 ? void 0 : dialog.scenarioId);
        const messages = yield models_1.Message.find({ dialogId: id });
        const user = yield models_1.User.findById(dialog === null || dialog === void 0 ? void 0 : dialog.createdUserId);
        res.status(200).json({ detail: { dialog, messages, scenario, user } });
    }
    catch (err) {
        const error = err;
        res.status(400).json({ error: error.errmsg });
    }
});
exports.dialogGetDetail = dialogGetDetail;
const dialogEnd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        res.status(400).json({ error: "Id not found" });
    try {
        const dialog = yield dialog_1.default.findOneAndUpdate({ _id: id }, { isEnded: true });
        if (!dialog) {
            res.status(404).send("Dialog not found");
            return;
        }
        res.status(201).json({});
    }
    catch (err) {
        const error = err;
        res.status(400).json({ error: error.errmsg });
    }
});
exports.dialogEnd = dialogEnd;
const dialogSubmit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        res.status(400).json({ error: "Id not found" });
    try {
        const dialog = yield dialog_1.default.findOneAndUpdate({ _id: id }, { isSubmitted: true });
        if (!dialog) {
            res.status(404).send("Dialog not found");
            return;
        }
        res.status(201).json({});
    }
    catch (err) {
        const error = err;
        res.status(400).json({ error: error.errmsg });
    }
});
exports.dialogSubmit = dialogSubmit;
const dialogFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        res.status(400).json({ error: "Id not found" });
    const { feedback } = req.body;
    try {
        const dialog = yield dialog_1.default.findOneAndUpdate({ _id: id }, { feedback });
        if (!dialog) {
            res.status(404).send("Dialog not found");
            return;
        }
        res.status(201).json({});
    }
    catch (err) {
        const error = err;
        res.status(400).json({ error: error.errmsg });
    }
});
exports.dialogFeedback = dialogFeedback;
