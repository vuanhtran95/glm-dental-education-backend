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
exports.generateScenario = void 0;
const huggingFace_1 = require("../utils/huggingFace");
const message_1 = require("../types/message");
const models_1 = require("../models");
const generateScenario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { patientName, gender, presentingComplaint, clinicalContext, medicalHistory, occupation, lifeStyle, emotionalState, personalTraits, communicationStyle, objectiveForStudent, } = req.body;
    try {
        const response = yield (0, huggingFace_1.callHfLlama3)([
            {
                role: message_1.EMessageRole.SYSTEM,
                content: buildScenarioTemplate(),
            },
        ], 512);
        const data = ((_a = response[0]) === null || _a === void 0 ? void 0 : _a.content) || "";
        try {
            const jsonRes = JSON.parse(data);
            const scenario = new models_1.Scenario({
                patientName: patientName || (jsonRes === null || jsonRes === void 0 ? void 0 : jsonRes.patientName),
                gender: gender || (jsonRes === null || jsonRes === void 0 ? void 0 : jsonRes.gender),
                dateOfBirth: jsonRes === null || jsonRes === void 0 ? void 0 : jsonRes.dateOfBirth,
                occupation: occupation || (jsonRes === null || jsonRes === void 0 ? void 0 : jsonRes.occupation),
                presentingComplaint: presentingComplaint || (jsonRes === null || jsonRes === void 0 ? void 0 : jsonRes.presentingComplaint),
                medicalHistory: medicalHistory || (jsonRes === null || jsonRes === void 0 ? void 0 : jsonRes.medicalHistory),
                lifeStyle: lifeStyle || (jsonRes === null || jsonRes === void 0 ? void 0 : jsonRes.lifeStyle),
                emotionalState: emotionalState || (jsonRes === null || jsonRes === void 0 ? void 0 : jsonRes.emotionalState),
                personalTraits: personalTraits || (jsonRes === null || jsonRes === void 0 ? void 0 : jsonRes.personalTraits),
                communicationStyle: communicationStyle || (jsonRes === null || jsonRes === void 0 ? void 0 : jsonRes.communicationStyle),
                clinicalContext: clinicalContext || (jsonRes === null || jsonRes === void 0 ? void 0 : jsonRes.clinicalContext),
            });
            const saved = yield scenario.save();
            res.status(201).json(saved);
            return;
        }
        catch (e) {
            res.status(404).json({});
            return;
        }
    }
    catch (err) {
        console.log(err, "error");
    }
});
exports.generateScenario = generateScenario;
const buildScenarioTemplate = () => {
    const index = Math.floor(Math.random() * 50) + 1;
    return `
    Return as a JSON object.
    Your responses must strictly adhere to the following structure:

    {
      "patientName": "<Full name of the patient>",
      "dateOfBirth": "<Date in DD MMM YYYY format>",
      "gender": "<Male, Female, or Other>",
      "occupation": "<A random occupation>",
      "presentingComplaint": "<Reason the patient visits the dentist>",
      "medicalHistory": "<Brief description of medical history>",
      "lifeStyle": "<Details about the patient's diet, smoking habits, and physical activity>",
      "emotionalState": "<Patient's emotional state>",
      "personalTraits": "<Patient's personality traits>",
      "communicationStyle": "<Patient's communication style>",
      "clinicalContext": "<Details about the patient's past dental visits or related history>"
    }

    Example question: Generate a dentist patient record with these fields. 
    Example answer ${index}:
    {
      "patientName": "Emily Chen",
      "dateOfBirth": "12 Mar 1995",
      "gender": "Female",
      "occupation": "Teacher",
      "presentingComplaint": "Gum bleeding and sensitivity to cold drinks",
      "medicalHistory": "Gum disease, dental fillings",
      "lifeStyle": "Balanced diet, non-smoker, regular exercise",
      "emotionalState": "Nervous",
      "personalTraits": "Polite and reserved",
      "communicationStyle": "Indirect and hesitant",
      "clinicalContext": "Regular checkups every six months, treated for gum disease last year"
    }

    Now here is my question: Generate a realistic and unique dentist patient record.
  `;
};
