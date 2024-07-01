import mongoose, { Schema } from 'mongoose';
import { EMessageRole, IMessage } from '../types/message';
import { runPolly } from '../services/polly';

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
    type: Schema.Types.ObjectId,
    required: true,
  },
  uri: {
    type: String,
    required: false,
  },
});

messageSchema.pre<IMessage>('save', async function (next) {
  this.createdAt = new Date();
  next();
});

const Message = mongoose.model<IMessage>('Message', messageSchema);
export default Message;
