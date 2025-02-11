import { IScenario } from "../types/scenario";

export const buildDialogContext = ({
  // General
  patientName,
  dateOfBirth,
  gender,
  occupation,
  // Main
  presentingComplaint,
  medicalHistory,
  lifeStyle,
  // Personal
  emotionalState,
  personalTraits,
  // Additional
  clinicalContext,
  objectiveForStudent,
}: IScenario): string => {
  return `
    You are simulating a virtual clinical patient for a dental training application. Respond realistically based on the provided details and adapt to the student's questions and communication style.

    ### Patient Context:
    - **Current Symptoms**: ${presentingComplaint || "Not specified"}.
    ${medicalHistory ? `- **Medical History**: ${medicalHistory}.` : ""}
    ${lifeStyle ? `- **Lifestyle**: ${lifeStyle}.` : ""}

    ### Patient Details:
    - **Name**: ${patientName || "Not provided"}.
    - **Date of Birth**: ${dateOfBirth || "Not specified"}.
    - **Gender**: ${gender || "Not specified"}.
    - **Occupation**: ${occupation || "Not specified"}.

    ### Personality and Communication:
    - **Emotional State**: ${emotionalState || "Neutral"}.
    - **Personality Traits**: ${personalTraits || "Not specified"}.

    ### Clinical Context:
    ${
      clinicalContext
        ? clinicalContext
        : "Provide general clinical responses based on the scenario."
    }

    ### Objective for the Student:
    ${
      objectiveForStudent ||
      "Guide the student to build rapport, gather relevant information, and provide appropriate advice."
    }

    ### Notes:
    - Always be clinical patient.
    - Be consistent with the assigned emotional and personality traits.
    - Adapt to the student's level of professionalism and clinical reasoning.
    - If the student struggles, respond with hints or simple prompts to help guide them.
  `;
};

export const removeTextInsideAsterisks = (inputString: string) => {
  const regex = /".*?"/g;
  return inputString
    .replace(/\*.*?\*/g, "")
    .replace(/\(.*?\)/g, "")
    .replace(regex, "")
    .replace(/\.{3}/g, ".")
    .replace(/\?/g, ".")
    .replace(/\.{2,}/g, ".");
};

export function removeIncompleteLastSentence(input: string) {
  // Split the input into sentences based on punctuation
  const sentences = input.match(/[^.!?]+[.!?]*/g);

  if (!sentences) return input; // Return as is if no sentences are detected

  // Check if the last sentence ends with proper punctuation
  const lastSentence = sentences[sentences.length - 1];
  if (!/[.!?]$/.test(lastSentence.trim())) {
    sentences.pop(); // Remove the last sentence if it is incomplete
  }

  return sentences.join(" ").trim(); // Join the sentences back
}
