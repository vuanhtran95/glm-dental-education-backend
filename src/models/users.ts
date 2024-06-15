import mongoose, { Schema } from 'mongoose';
import { ERole, IUser } from '../types/user';
import Account from './account';

const userSchema: Schema = new Schema<IUser>({
  accountId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ERole,
  },
  fullName: {
    type: String,
    required: true,
  },
});

userSchema.pre<IUser>('save', async function (next) {
  try {
    Account.findById(this.accountId);
    next();
  } catch (error) {
    console.error(error);
  }
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
