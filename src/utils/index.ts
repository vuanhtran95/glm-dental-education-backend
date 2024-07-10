import { IScenario } from '../types/scenario';

export const buildDialogContext = ({
  patientName,
  dateOfBirth,
  gender,
  medicalHistory,
  symptoms,
  lifeStyle,
}: IScenario) => {
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

export const removeTextInsideAsterisks = (inputString: string) => {
  const regex = /".*?"/g;
  return inputString
    .replace(/\*.*?\*/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(regex, '');
};
