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
exports.generateScenario = void 0;
const scenario_1 = __importDefault(require("../models/scenario"));
const user_1 = require("../types/user");
const generateScenario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientName, gender } = req.body;
    try {
        // const response = await axios.post(
        //   env.llamaApi,
        //   {
        //     inputs:
        //       "<|begin_of_text|><|start_header_id|>user<|end_header_id|>You are a robot that only outputs JSON. You reply in JSON format with the field 'patientName', 'dateOfBirth', 'gender', 'medicalHistory', 'symptoms', 'lifeStyle'. Example question: Generate dentist patient record with these fields? Example answer: {'patientName': 'Peter Pan', 'dateOfBirth': '14 Jul 2002', 'gender': 'Male', 'lifeStyle': ''} Now here is my question: Generate a relistic dentist patient record.<|eot_id|><|start_header_id|>assistant<|end_header_id|>",
        //     parameters: {
        //       max_new_tokens: 96,
        //       top_p: 0.9,
        //       temperature: 0.6,
        //     },
        //   },
        //   {
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //       'Access-Control-Allow-Origin': '*',
        //     },
        //   }
        // );
        // const responseData = response.data.split('<|end_header_id|>');
        // const parseValue = responseData[responseData.length - 1].replace(/\n/g, '');
        // const params = {
        //   ...JSON.parse(parseValue),
        //   patientName,
        //   gender,
        // };
        const mockParams = {
            patientName,
            dateOfBirth: "16/9/2005",
            gender: user_1.IGender.FEMALE,
            medicalHistory: 'None',
            symptoms: 'Nib',
            lifeStyle: '',
        };
        const scenario = new scenario_1.default(mockParams);
        const saved = yield scenario.save();
        setTimeout(() => {
            res.status(201).json(saved);
        }, 1000);
    }
    catch (err) {
        console.log(err, 'error');
    }
});
exports.generateScenario = generateScenario;
