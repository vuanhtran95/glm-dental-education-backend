export interface IAccount extends Document {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isModified(path: string): boolean;
}
