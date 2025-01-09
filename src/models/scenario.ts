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
    required: false,
  },

  // Clinical context
  presentingComplaint: {
    type: String,
    required: true,
  },
  medicalHistory: {
    type: String,
    required: false,
  },
  lifeStyle: {
    type: String,
    required: false,
  },

  // Personal
  emotionalState: {
    type: String,
    required: false, // Neutral
  },
  personalTraits: {
    type: String,
    required: false,
  },
  communicationStyle: {
    type: String,
    required: false,
  },

  // Additional
  clinicalContext: {
    type: String,
    required: false,
  },
  objectiveForStudent: {
    type: String,
    required: false,
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
