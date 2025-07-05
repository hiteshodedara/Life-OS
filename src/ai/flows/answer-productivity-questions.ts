'use server';

/**
 * @fileOverview Provides an AI assistant that answers general productivity or life-related questions.
 *
 * - answerProductivityQuestion - A function that handles answering productivity questions.
 * - AnswerProductivityQuestionInput - The input type for the answerProductivityQuestion function.
 * - AnswerProductivityQuestionOutput - The return type for the answerProductivityQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerProductivityQuestionInputSchema = z.object({
  question: z.string().describe('The productivity or life-related question to be answered.'),
});
export type AnswerProductivityQuestionInput = z.infer<typeof AnswerProductivityQuestionInputSchema>;

const AnswerProductivityQuestionOutputSchema = z.object({
  answer: z.string().describe('The AI assistant answer to the question.'),
});
export type AnswerProductivityQuestionOutput = z.infer<typeof AnswerProductivityQuestionOutputSchema>;

export async function answerProductivityQuestion(input: AnswerProductivityQuestionInput): Promise<AnswerProductivityQuestionOutput> {
  return answerProductivityQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerProductivityQuestionPrompt',
  input: {schema: AnswerProductivityQuestionInputSchema},
  output: {schema: AnswerProductivityQuestionOutputSchema},
  prompt: `You are a helpful AI assistant designed to provide informative answers to general productivity and life-related questions.

  Question: {{{question}}}
  Answer: `,
});

const answerProductivityQuestionFlow = ai.defineFlow(
  {
    name: 'answerProductivityQuestionFlow',
    inputSchema: AnswerProductivityQuestionInputSchema,
    outputSchema: AnswerProductivityQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
