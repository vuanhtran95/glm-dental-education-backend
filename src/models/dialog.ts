import mongoose, { Schema } from 'mongoose';
import { IDialog } from '../types/dialog';

const dialogSchema: Schema = new Schema<IDialog>({
  createdUserId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  scenarioId: {
    type: Schema.Types.ObjectId,
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
  isEnded: {
    type: Boolean,
    default: false,
  },
  isSubmitted: {
    type: Boolean,
    default: false,
  },
  feedback: {
    type: String,
    default: false,
  },
});

dialogSchema.pre<IDialog>('save', async function (next) {
  this.updatedAt = new Date();
  next();
});

const Dialog = mongoose.model<IDialog>('Dialog', dialogSchema);
export default Dialog;
