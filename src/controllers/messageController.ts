import { Request, Response } from 'express';
import { Message } from '../models';
import { ERROR_RESPONSE } from '../constants';
import { EMessageRole, LlamaMessage } from '../types/message';
import axios from 'axios';

export const messageCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { message, dialogId } = req.body;

  const messages = await Message.find({ dialogId });

  const assistantMessage = 'Mock Message.';

  // const assistantMessage = await callToLlama2(message.content, messages);

  const payload = [
    {
      role: EMessageRole.USER,
      content: message.content,
      uri: message.uri,
      dialogId,
    },
    {
      role: EMessageRole.ASSISTANT,
      content: removeIncompleteSentences(assistantMessage),
      dialogId,
    },
  ];

  try {
    const message = await Message.insertMany(payload);

    res.status(201).json({ message });
  } catch (err) {
    res.status(400).json(ERROR_RESPONSE.SERVER_ERROR);
  }
};

export const callToLlama2 = async (
  question: string,
  history: LlamaMessage[]
) => {
  try {
    const response = await axios.post(
      'https://6gp68ltt10.execute-api.eu-west-2.amazonaws.com/default/callToLlama',
      {
        inputs: buildMessage(question, history).replace(/\n/g, ''),
        parameters: {
          max_new_tokens: 48,
          top_p: 0.9,
          temperature: 0.6,
        },
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    const raw1 = response.data.split('<|end_header_id|>');
    const raw2 = raw1[raw1.length - 1].replace(/\n/g, '');
    return raw2;
  } catch (err) {
    console.log(err, 'errrrrrrr');
  }
};

export const buildMessage = (question: string, history: LlamaMessage[]) => {
  return `<|begin_of_text|><|start_header_id|>system<|end_header_id|>${
    history[0].content
  }
  ${history
    .filter((message) => message.role === EMessageRole.SYSTEM)
    .map((message) =>
      message.role === EMessageRole.USER
        ? `<|eot_id|><|start_header_id|>user<|end_header_id|>${message.content}`
        : `<|eot_id|><|start_header_id|>assistant<|end_header_id|>${message.content}`
    )}<|eot_id|><|start_header_id|>user<|end_header_id|>${question}<|eot_id|><|start_header_id|>assistant<|end_header_id|>`;
};

const removeIncompleteSentences = (text: string) => {
  // Split the text into paragraphs
  let paragraphs = text.split('\n');

  // Process each paragraph
  paragraphs = paragraphs.map((paragraph) => {
    // Trim any extra whitespace
    paragraph = paragraph.trim();

    // Find the last sentence
    let lastSentenceIndex = paragraph.lastIndexOf('.');

    // If the last sentence doesn't end with a dot, remove it
    if (
      lastSentenceIndex === -1 ||
      lastSentenceIndex !== paragraph.length - 1
    ) {
      let sentences = paragraph.split('.');
      // Remove the last sentence
      sentences.pop();
      // Join the remaining sentences back together
      paragraph = sentences.join('.') + '.';
    }

    return paragraph;
  });

  // Join the paragraphs back together
  return paragraphs.join('\n');
};
