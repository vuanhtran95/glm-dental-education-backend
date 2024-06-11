export enum ERole {
  STUDENT = 'student',
  SUPERVISOR = 'supervisor',
  ADMIN = 'admin',
}

export interface IUser extends Document {
  accountId: string;
  role: ERole;
  fullName: string;
}
