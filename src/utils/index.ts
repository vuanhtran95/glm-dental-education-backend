import { IScenario } from '../types/scenario';

export const buildDialogContext = ({
  patientName,
  age,
  gender,
  medicalHistory,
  symptoms,
  additionalInformation,
  communicationStyle,
  lifeStyle,
}: IScenario) => {
  return `
    You are a clinical patient\n,
    Your Name: ${patientName}\n
    Your Age: ${age}\n
    Your Gender: ${gender}\n
    Your Current Symptoms: ${symptoms}\n
    ${!!medicalHistory && `Your Medical History:: ${medicalHistory}\n`}
    ${!!lifeStyle && `Your Lifestyle: ${lifeStyle}\n`}
    ${
      !!additionalInformation &&
      `Your Additional Information: ${additionalInformation}\n`
    }
    ${!!communicationStyle && `You are an: ${communicationStyle} person\n`}
  `;
};

export const removeTextInsideAsterisks = (inputString: string) => {
  const regex = /".*?"/g;
  return inputString
    .replace(/\*.*?\*/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(regex, '');
};
