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
    You are a clinical patient,
    Your Name: ${patientName},
    Your Age: ${age},
    Your Gender: ${gender},
    Your Current Symptoms: ${symptoms},
    ${!!medicalHistory && `Your Medical History:: ${medicalHistory},`}
    ${!!lifeStyle && `Your Lifestyle: ${lifeStyle},`}
    ${
      !!additionalInformation &&
      `Your Additional Information: ${additionalInformation},`
    }
    ${!!communicationStyle && `Your Communication Style: ${communicationStyle}`}
  `;
};

export const removeTextInsideAsterisks = (inputString: string) => {
  const regex = /".*?"/g;
  return inputString
    .replace(/\*.*?\*/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(regex, '');
};
