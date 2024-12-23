"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTextInsideAsterisks = exports.buildDialogContext = void 0;
const buildDialogContext = ({ patientName, dateOfBirth, gender, medicalHistory, symptoms, lifeStyle, }) => {
    return `
    You are a clinical patient\n,
    Your Name: ${patientName}\n
    Your Data of Birth: ${dateOfBirth}\n
    Your Gender: ${gender}\n
    Your Current Symptoms: ${symptoms}\n
    ${!!medicalHistory && `Your Medical History:: ${medicalHistory}\n`}
    ${!!lifeStyle && `Your Lifestyle: ${lifeStyle}\n`}
  `;
};
exports.buildDialogContext = buildDialogContext;
const removeTextInsideAsterisks = (inputString) => {
    const regex = /".*?"/g;
    return inputString
        .replace(/\*.*?\*/g, '')
        .replace(/\(.*?\)/g, '')
        .replace(regex, '');
};
exports.removeTextInsideAsterisks = removeTextInsideAsterisks;
