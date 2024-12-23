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
exports.buildMessage = exports.callToLlama2 = exports.messageFeedback = exports.messageCreate = void 0;
const models_1 = require("../models");
const constants_1 = require("../constants");
const message_1 = require("../types/message");
const axios_1 = __importDefault(require("axios"));
const env_1 = __importDefault(require("../config/env"));
const messageCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, dialogId } = req.body;
    // const messages = await Message.find({ dialogId });
    // const assistantMessage = await callToLlama2(message.content, messages);
    const assistantMessage = Math.random();
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
        res.status(400).json({ error: 'Id not found' });
    const { feedback } = req.body;
    try {
        const message = yield models_1.Message.findOneAndUpdate({ _id: id }, { feedback });
        if (!message) {
            res.status(404).send('Message not found');
            return;
        }
        res.status(201).json({ message });
    }
    catch (err) {
        res.status(400).json(constants_1.ERROR_RESPONSE.SERVER_ERROR);
    }
});
exports.messageFeedback = messageFeedback;
const callToLlama2 = (question, history) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(env_1.default.llamaApi, {
            inputs: (0, exports.buildMessage)(question, history).replace(/\n/g, ''),
            parameters: {
                max_new_tokens: 48,
                top_p: 0.9,
                temperature: 0.6,
            },
        }, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        const rawResponse = response.data.split('<|end_header_id|>');
        return rawResponse[rawResponse.length - 1].replace(/\n/g, '');
    }
    catch (err) {
        console.log(err, 'error');
    }
});
exports.callToLlama2 = callToLlama2;
const buildMessage = (question, history) => {
    return `<|begin_of_text|><|start_header_id|>system<|end_header_id|>${history[0].content}
  ${history
        .filter((message) => message.role === message_1.EMessageRole.SYSTEM)
        .map((message) => message.role === message_1.EMessageRole.USER
        ? `<|eot_id|><|start_header_id|>user<|end_header_id|>${message.content}`
        : `<|eot_id|><|start_header_id|>assistant<|end_header_id|>${message.content}`)}<|eot_id|><|start_header_id|>user<|end_header_id|>${question}<|eot_id|><|start_header_id|>assistant<|end_header_id|>`;
};
exports.buildMessage = buildMessage;
