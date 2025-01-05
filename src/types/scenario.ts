import { IGender } from "./user";

export interface IScenario {
  patientName: string;
  dateOfBirth: string;
  gender: IGender;
  medicalHistory: string;
  symptoms: string;
  lifeStyle: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
