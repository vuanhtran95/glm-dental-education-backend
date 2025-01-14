import { Types } from "mongoose";

export enum EMessageRole {
  SYSTEM = "system",
  USER = "user",
  ASSISTANT = "assistant",
}

export interface IMessage {
  role: string;
  content?: string;
  createdAt: Date;
  dialogId: Types.ObjectId;
  uri?: string;
  feedback: string;
}

export type LlamaMessage = Pick<IMessage, "role" | "content" | "uri">;
