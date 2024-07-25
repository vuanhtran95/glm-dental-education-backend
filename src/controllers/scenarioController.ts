import { Request, Response } from 'express';
import { MongoServerError } from 'mongodb';
import Scenario from '../models/scenario';
import { ERROR_RESPONSE } from '../constants';
import axios from 'axios';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models';
import { IGender } from '../types/user';

export const generateScenario = async (req: Request, res: Response) => {
  const { patientName, gender } = req.body;

  try {
    // const response = await axios.post(
    //   'https://sbyv3a06nk.execute-api.eu-west-2.amazonaws.com/default/callToLlama',
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
    //       'Access-Control-Allow-Origin': '*',s
    //     },
    //   }
    // );

    // const raw1 = response.data.split('<|end_header_id|>');

    // const raw2 = raw1[raw1.length - 1].replace(/\n/g, '');

    const params = {
      // ...JSON.parse(raw2),
      // patientName,
      // gender,
      ...mockGenerateScenario,
    };

    const scenario = new Scenario(params);
    const saved = await scenario.save();
    res.status(201).json(saved);
  } catch (err) {
    console.log(err, 'errrrrrrr');
  }
};

export const mockGenerateScenario = {
  patientName: 'Mock Patient',
  dateOfBirth: '14/07/1995',
  gender: IGender.MALE,
  symptoms: 'Mock Symptom',
  medicalHistory: 'Mock',
  lifeStyle: 'Mock',
};
