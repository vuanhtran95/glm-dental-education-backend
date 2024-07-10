import { Request, Response } from 'express';
import { MongoServerError } from 'mongodb';
import Scenario from '../models/scenario';
import { ERROR_RESPONSE } from '../constants';
import axios from 'axios';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models';

export const scenarioCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    patientName,
    dateOfBirth,
    symptoms,
    lifeStyle,
    createdUserId,
    name,
    gender,
    medicalHistory,
  } = req.body;

  try {
    const scenario = new Scenario({
      name,
      patientName,
      dateOfBirth,
      gender,
      medicalHistory,
      symptoms,
      lifeStyle,
      createdUserId,
    });

    const savedScenario = await scenario.save();
    res.status(201).json(savedScenario);
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};

export const scenarioGetList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const scenarios = await Scenario.find().sort({ updatedAt: 'desc' });
    res.status(200).json({ scenarios });
  } catch (err) {
    const error = err as MongoServerError;
    res.status(400).json({ error: error.errmsg });
  }
};

export const scenarioGetDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!id) res.status(400).json(ERROR_RESPONSE.RECORD_NOT_FOUND);

  try {
    const scenario = await Scenario.findById(id);
    res.status(200).json(scenario);
  } catch (err) {
    const error = err as MongoServerError;

    res.status(400).json({ error: error.errmsg });
  }
};

export const generateScenario = async (req: Request, res: Response) => {
  const { createdUserId, patientName, gender } = req.body;

  if (!createdUserId) res.status(400).json({ error: 'Id not found' });
  try {
    const response = await axios.post(
      'https://sbyv3a06nk.execute-api.eu-west-2.amazonaws.com/default/callToLlama',
      {
        inputs:
          "<|begin_of_text|><|start_header_id|>user<|end_header_id|>You are a robot that only outputs JSON. You reply in JSON format with the field 'patientName', 'dateOfBirth', 'gender', 'medicalHistory', 'symptoms', 'lifeStyle'. Example question: Generate dentist patient record with these fields? Example answer: {'patientName': 'Peter Pan', 'dateOfBirth': '14 Jul 2002', 'gender': 'Male', 'lifeStyle': ''} Now here is my question: Generate a relistic dentist patient record.<|eot_id|><|start_header_id|>assistant<|end_header_id|>",
        parameters: {
          max_new_tokens: 96,
          top_p: 0.9,
          temperature: 0.6,
        },
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    const raw1 = response.data.split('<|end_header_id|>');

    const raw2 = raw1[raw1.length - 1].replace(/\n/g, '');

    const params = {
      ...JSON.parse(raw2),
      createdUserId,
      patientName,
      gender,
    };

    const scenario = new Scenario(params);
    const saved = await scenario.save();
    res.status(200).json(saved);
  } catch (err) {
    console.log(err, 'errrrrrrr');
  }
};
