export enum ERole {
  STUDENT = 'student',
  SUPERVISOR = 'supervisor',
  ADMIN = 'admin',
}

export interface IAccount extends Document {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isModified(path: string): boolean;
}

export interface IUser extends Document {
  accountId: string;
  role: ERole;
  fullName: string;
}
