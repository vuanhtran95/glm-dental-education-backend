import { Request, Response } from "express";
import { callHfLlama3 } from "../utils/huggingFace";
import { EMessageRole } from "../types/message";
import { Scenario } from "../models";

const MAX_TOKEN_BUILD_SCENARIO = 512;

export const generateScenario = async (req: Request, res: Response) => {
  const {
    // general
    patientName,
    gender,
    // clinical
    verbosityLevel,
    presentingComplaint,
    emotionalState,
    clinicalContext,
  } = req.body;

  try {
    const response = await callHfLlama3(
      [
        {
          role: EMessageRole.SYSTEM,
          content: buildScenarioTemplate({
            presentingComplaint,
            clinicalContext,
          }),
        },
      ],
      MAX_TOKEN_BUILD_SCENARIO
    );

    const data = response[0]?.content || "";

    try {
      const jsonRes = JSON.parse(data);

      const scenario = new Scenario({
        patientName: patientName || jsonRes?.patientName,
        gender: gender || jsonRes?.gender,
        dateOfBirth: jsonRes?.dateOfBirth,
        occupation: jsonRes?.occupation,

        presentingComplaint:
          presentingComplaint || jsonRes?.presentingComplaint,
        medicalHistory: jsonRes?.medicalHistory,
        lifeStyle: jsonRes?.lifeStyle,

        emotionalState: emotionalState,
        personalTraits: jsonRes?.personalTraits,
        verbosityLevel: verbosityLevel,

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

const buildScenarioTemplate = ({
  presentingComplaint,
  clinicalContext,
}: {
  presentingComplaint: string;
  clinicalContext: string;
}) => {
  const index = Math.floor(Math.random() * 50) + 1;

  return `
    Return as a JSON object.
    Your responses must strictly adhere to the following structure.
    The patient has Presenting Complaint ${presentingComplaint}
    The patient has Clinical Context ${clinicalContext}

    {
      "patientName": "<Full name of the patient>",
      "dateOfBirth": "<Date in DD MMM YYYY format>",
      "gender": "<Male, Female, or Other>",
      "occupation": "<A random occupation>",
      "presentingComplaint": "<Reason the patient visits the dentist>",
      "medicalHistory": "<Brief description of medical history>",
      "lifeStyle": "<Details about the patient's diet, smoking habits, and physical activity>",
      "personalTraits": "<Patient's personality traits>",
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
      "personalTraits": "Polite and reserved",
      "clinicalContext": "Regular checkups every six months, treated for gum disease last year"
    }

    Now here is my question: Generate a realistic and unique dentist patient record.
  `;
};
