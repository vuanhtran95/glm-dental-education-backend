import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import { IAccount } from '../types/account';

const accountSchema: Schema = new Schema<IAccount>({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

accountSchema.pre<IAccount>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  this.updatedAt = new Date();
  next();
});

const Account = mongoose.model<IAccount>('Account', accountSchema);
export default Account;
