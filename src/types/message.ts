import { Types } from 'mongoose';

export enum EMessageRole {
  SYSTEM = 'system',
  USER = 'user',
}

export interface IMessage {
  role: EMessageRole;
  content: string;
  createdAt: Date;
  dialogId: Types.ObjectId;
}
