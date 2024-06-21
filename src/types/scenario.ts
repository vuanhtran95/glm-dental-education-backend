import { Types } from 'mongoose';

export interface ISymptom {
  name: string;
  description: string;
}

export interface IScenario extends Document {
  name: string;
  patientName: string;
  age: number;
  symptoms: ISymptom[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  createdUserId: Types.ObjectId;
}
