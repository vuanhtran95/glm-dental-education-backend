import { Types } from 'mongoose';
import { IGender } from './user';

export interface IScenario extends Document {
  name: string;
  patientName: string;
  communicationStyle: string;
  age: number;
  gender: IGender;
  medicalHistory: string;
  symptoms: string;
  lifeStyle: string;
  additionalInformation: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  createdUserId: Types.ObjectId;
}
