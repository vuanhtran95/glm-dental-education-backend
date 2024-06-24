import { Types } from 'mongoose';

export enum ERole {
  STUDENT = 'student',
  SUPERVISOR = 'supervisor',
  ADMIN = 'admin',
}

export enum IGender {
  MALE = 'male',
  FEMALE = 'female',
}

export interface IUser extends Document {
  accountId: Types.ObjectId;
  role: ERole;
  fullName: string;
}
