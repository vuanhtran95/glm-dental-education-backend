import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/account';

const userSchema: Schema = new Schema<IUser>({
  accountId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
});

userSchema.pre<IUser>('save', async function (next) {
  next();
});

const Account = mongoose.model<IUser>('User', userSchema);
export default Account;
