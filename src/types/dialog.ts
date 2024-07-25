import { Types } from 'mongoose';

export interface IDialog {
  createdUserId: Types.ObjectId;
  scenarioId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isEnded: boolean;
  isSubmitted: boolean;
}
