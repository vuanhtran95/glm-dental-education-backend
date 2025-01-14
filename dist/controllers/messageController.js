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
Object.defineProperty(exports, "__esModule", { value: true });
exports.callToLlama = exports.messageFeedback = exports.messageCreate = void 0;
const models_1 = require("../models");
const constants_1 = require("../constants");
const message_1 = require("../types/message");
const huggingFace_1 = require("../utils/huggingFace");
const utils_1 = require("../utils");
const messageCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, dialogId } = req.body;
    const messages = yield models_1.Message.find({ dialogId });
    const assistantMessage = yield (0, exports.callToLlama)(message.content, messages);
    const payload = [
        {
            role: message_1.EMessageRole.USER,
            content: message.content,
            uri: message.uri,
            dialogId,
        },
        {
            role: message_1.EMessageRole.ASSISTANT,
            content: assistantMessage,
            dialogId,
        },
    ];
    try {
        const message = yield models_1.Message.insertMany(payload);
        res.status(201).json({ message });
    }
    catch (err) {
        res.status(400).json(constants_1.ERROR_RESPONSE.SERVER_ERROR);
    }
});
exports.messageCreate = messageCreate;
const messageFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        res.status(400).json({ error: "Id not found" });
    const { feedback } = req.body;
    try {
        const message = yield models_1.Message.findOneAndUpdate({ _id: id }, { feedback });
        if (!message) {
            res.status(404).send("Message not found");
            return;
        }
        res.status(201).json({ message });
    }
    catch (err) {
        res.status(400).json(constants_1.ERROR_RESPONSE.SERVER_ERROR);
    }
});
exports.messageFeedback = messageFeedback;
const callToLlama = (question_1, history_1, ...args_1) => __awaiter(void 0, [question_1, history_1, ...args_1], void 0, function* (question, history, maxToken = 48) {
    try {
        const res = yield (0, huggingFace_1.callHfLlama3)([...history, { role: message_1.EMessageRole.USER, content: question }], 64);
        console.log(res);
        return (0, utils_1.removeTextInsideAsterisks)(res[0].content || "");
    }
    catch (err) {
        console.log(err, "error");
    }
});
exports.callToLlama = callToLlama;
