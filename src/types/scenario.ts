import { IGender } from "./user";

export interface IScenario {
  // General Information
  patientName: string;
  dateOfBirth: string;
  gender: IGender;
  occupation: string;

  // Main
  presentingComplaint: string; // reason for visit
  medicalHistory: string;
  lifeStyle: string;

  // Personal
  emotionalState: string;
  personalTraits: string;
  communicationStyle: string;

  // Additional
  clinicalContext: string;
  objectiveForStudent: string;

  // Mongo
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
