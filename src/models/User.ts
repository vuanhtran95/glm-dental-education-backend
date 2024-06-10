import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/users';

const userSchema: Schema = new Schema<IUser>({
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

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  this.updatedAt = new Date();
  next();
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
