import {
  StartSpeechSynthesisTaskCommand,
  StartSpeechSynthesisTaskCommandInput,
} from '@aws-sdk/client-polly';
import pollyClient from './polly-client';

/**
 *
 * @param text
 * @returns uri
 */
export const runPolly = async (text: string): Promise<string> => {
  const params = {
    OutputFormat: 'mp3',
    OutputS3BucketName: 'polly-bucket-dental-llm',
    Text: text,
    TextType: 'text',
    VoiceId: 'Joanna',
    SampleRate: '22050',
  } as StartSpeechSynthesisTaskCommandInput;

  try {
    const response = await pollyClient.send(
      new StartSpeechSynthesisTaskCommand(params)
    );
    return response.SynthesisTask?.OutputUri || '';
  } catch (err) {
    return '';
  }
};
