import mongoose, { Schema } from 'mongoose';
import { EMessageRole, IMessage } from '../types/message';

const messageSchema: Schema = new Schema<IMessage>({
  role: {
    type: String,
    required: true,
    enum: EMessageRole,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  dialogId: {
    type: String,
    required: true,
  },
});

messageSchema.pre<IMessage>('save', async function (next) {
  this.createdAt = new Date();
  next();
});

const Message = mongoose.model<IMessage>('Message', messageSchema);
export default Message;
