export interface ISymptom {
  name: string;
  description: string;
}

export interface IScenario extends Document {
  patientName: string;
  age: number;
  symptoms: ISymptom[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  createdUserId: string;
}
