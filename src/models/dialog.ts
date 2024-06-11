import mongoose, { Schema } from 'mongoose';
import { IDialog } from '../types/dialog';

const dialogSchema: Schema = new Schema<IDialog>({
  createdUserId: {
    type: String,
    required: true,
  },
  scenarioId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

dialogSchema.pre<IDialog>('save', async function (next) {
  this.updatedAt = new Date();
  next();
});

const Dialog = mongoose.model<IDialog>('Dialog', dialogSchema);
export default Dialog;
