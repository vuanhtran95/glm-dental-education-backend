import { Request, Response } from "express";
import { callHfLlama3 } from "../utils/huggingFace";
import { EMessageRole } from "../types/message";
import { Scenario } from "../models";

export const generateScenario = async (req: Request, res: Response) => {
  const {
    patientName,
    gender,
    presentingComplaint,
    clinicalContext,
    medicalHistory,
    occupation,
    lifeStyle,
    emotionalState,
    personalTraits,
    communicationStyle,
    objectiveForStudent,
  } = req.body;

  try {
    const response = await callHfLlama3(
      [
        {
          role: EMessageRole.SYSTEM,
          content: buildScenarioTemplate(),
        },
      ],
      512
    );

    const data = response[0]?.content || "";

    try {
      const jsonRes = JSON.parse(data);

      const scenario = new Scenario({
        patientName: patientName || jsonRes?.patientName,
        gender: gender || jsonRes?.gender,
        dateOfBirth: jsonRes?.dateOfBirth,
        occupation: occupation || jsonRes?.occupation,

        presentingComplaint:
          presentingComplaint || jsonRes?.presentingComplaint,
        medicalHistory: medicalHistory || jsonRes?.medicalHistory,
        lifeStyle: lifeStyle || jsonRes?.lifeStyle,

        emotionalState: emotionalState || jsonRes?.emotionalState,
        personalTraits: personalTraits || jsonRes?.personalTraits,
        communicationStyle: communicationStyle || jsonRes?.communicationStyle,

        clinicalContext: clinicalContext || jsonRes?.clinicalContext,
      });
      const saved = await scenario.save();
      res.status(201).json(saved);
      return;
    } catch (e) {
      res.status(404).json({});
      return;
    }
  } catch (err) {
    console.log(err, "error");
  }
};

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
