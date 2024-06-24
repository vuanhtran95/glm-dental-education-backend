import mongoose, { Schema, Types } from 'mongoose';
import { IScenario } from '../types/scenario';
import { IGender } from '../types/user';

const scenarioSchema: Schema = new Schema<IScenario>({
  name: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  communicationStyle: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: IGender,
  },
  medicalHistory: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  lifeStyle: {
    type: String,
    required: true,
  },
  additionalInformation: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdUserId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

scenarioSchema.pre<IScenario>('save', async function (next) {
  this.updatedAt = new Date();
  next();
});

const Scenario = mongoose.model<IScenario>('Scenario', scenarioSchema);
export default Scenario;
