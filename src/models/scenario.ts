import mongoose, { Schema } from 'mongoose';
import { IScenario, ISymptom } from '../types/scenario';

const symptomSchema: Schema = new Schema<ISymptom>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const scenarioSchema: Schema = new Schema<IScenario>({
  patientName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  symptoms: [symptomSchema],
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
    type: String,
    required: true,
  },
});

scenarioSchema.pre<IScenario>('save', async function (next) {
  this.updatedAt = new Date();
  next();
});

const Scenario = mongoose.model<IScenario>('Scenario', scenarioSchema);
export default Scenario;
