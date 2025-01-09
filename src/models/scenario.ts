import mongoose, { Schema, Types } from "mongoose";
import { IScenario } from "../types/scenario";
import { IGender } from "../types/user";

const scenarioSchema: Schema = new Schema<IScenario>({
  // General
  patientName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: IGender,
  },
  occupation: {
    type: String,
    required: true,
  },

  // Clinical context
  medicalHistory: {
    type: String,
    required: true,
  },
  presentingComplaint: {
    type: String,
    required: true,
  },
  lifeStyle: {
    type: String,
    required: true,
  },

  // Personal
  emotionalState: {
    type: String,
    required: true,
  },
  personalTraits: {
    type: String,
    required: true,
  },
  communicationStyle: {
    type: String,
    required: true,
  },

  // Additional
  clinicalContext: {
    type: String,
    required: true,
  },
  objectiveForStudent: {
    type: String,
    required: true,
  },

  // Mongo
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

scenarioSchema.pre<IScenario>("save", async function (next) {
  this.updatedAt = new Date();
  next();
});

const Scenario = mongoose.model<IScenario>("Scenario", scenarioSchema);
export default Scenario;
