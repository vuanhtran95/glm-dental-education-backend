import { Types } from 'mongoose';

export interface IDialog {
  name: string;
  createdUserId: Types.ObjectId;
  scenarioId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
