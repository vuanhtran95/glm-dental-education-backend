import { Request, Response } from "express";
import Scenario from "../models/scenario";
import { IScenario } from "../types/scenario";
import { IGender } from "../types/user";

export const generateScenario = async (req: Request, res: Response) => {
  const { patientName, gender, clinicalContext, medicalHistory } = req.body;

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

    function getRandomElement<T>(array: T[]): T {
      return array[Math.floor(Math.random() * array.length)];
    }

    const mockParams: IScenario = {
      // General
      patientName,
      dateOfBirth: "16/9/2005",
      gender,
      occupation: getRandomElement(["Teacher", "Software Engineer", "Retired"]),

      // Context
      presentingComplaint: "Toothache in the lower left molar region.",
      medicalHistory:
        medicalHistory ||
        getRandomElement([
          "Diabetes",
          "Hypertension",
          "No significant history",
        ]),
      lifeStyle: getRandomElement([
        "Healthy lifestyle with occasional exercise",
        "Consumes fast food regularly, irregular oral hygiene",
      ]),

      // Additional
      clinicalContext: clinicalContext || "Patient is experiencing oral pain.",

      // Personality and communication:
      emotionalState: getRandomElement(["Nervous", "Calm", "Irritated"]),
      personalTraits: getRandomElement(["Talkative", "Reserved", "Skeptical"]),
      communicationStyle: getRandomElement([
        "Direct",
        "Hesitant",
        "Inquisitive",
      ]),

      // Objective
      objectiveForStudent:
        "Build rapport and provide appropriate treatment recommendations.",
    };

    const scenario = new Scenario(mockParams);
    const saved = await scenario.save();
    res.status(201).json(saved);
  } catch (err) {
    console.log(err, "error");
  }
};
