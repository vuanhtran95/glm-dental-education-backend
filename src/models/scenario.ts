import mongoose, { Schema, Types } from "mongoose";
import { IScenario } from "../types/scenario";
import { IGender } from "../types/user";

const scenarioSchema: Schema = new Schema<IScenario>({
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
  medicalHistory: {
    type: String,
    required: true,
  },
  clinicalContext: {
    type: String,
    required: true,
  },
  mentalState: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  lifeStyle: {
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
});

scenarioSchema.pre<IScenario>("save", async function (next) {
  this.updatedAt = new Date();
  next();
});

const Scenario = mongoose.model<IScenario>("Scenario", scenarioSchema);
export default Scenario;
