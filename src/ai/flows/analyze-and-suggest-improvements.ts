'use server';
/**
 * @fileOverview The AI Productivity Assistant that analyzes user data and provides suggestions.
 *
 * - analyzeAndSuggestImprovements - A function that analyzes user data and provides suggestions.
 * - AnalyzeAndSuggestImprovementsInput - The input type for the analyzeAndSuggestImprovements function.
 * - AnalyzeAndSuggestImprovementsOutput - The return type for the analyzeAndSuggestImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeAndSuggestImprovementsInputSchema = z.object({
  expenseData: z.string().describe('User expense data in JSON format.'),
  todoData: z.string().describe('User todo data in JSON format.'),
  noteData: z.string().describe('User note data in JSON format.'),
});
export type AnalyzeAndSuggestImprovementsInput = z.infer<
  typeof AnalyzeAndSuggestImprovementsInputSchema
>;

const AnalyzeAndSuggestImprovementsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'Personalized suggestions for improvement based on the user data.'
    ),
});
export type AnalyzeAndSuggestImprovementsOutput = z.infer<
  typeof AnalyzeAndSuggestImprovementsOutputSchema
>;

export async function analyzeAndSuggestImprovements(
  input: AnalyzeAndSuggestImprovementsInput
): Promise<AnalyzeAndSuggestImprovementsOutput> {
  return analyzeAndSuggestImprovementsFlow(input);
}

const analyzeAndSuggestImprovementsPrompt = ai.definePrompt({
  name: 'analyzeAndSuggestImprovementsPrompt',
  input: {schema: AnalyzeAndSuggestImprovementsInputSchema},
  output: {schema: AnalyzeAndSuggestImprovementsOutputSchema},
  prompt: `You are a personal AI assistant that analyzes user data and provides personalized suggestions for improvement.

Analyze the following data and provide suggestions for improvement. Be concise and actionable.

Expense Data: {{{expenseData}}}
Todo Data: {{{todoData}}}
Note Data: {{{noteData}}}`,
});

const analyzeAndSuggestImprovementsFlow = ai.defineFlow(
  {
    name: 'analyzeAndSuggestImprovementsFlow',
    inputSchema: AnalyzeAndSuggestImprovementsInputSchema,
    outputSchema: AnalyzeAndSuggestImprovementsOutputSchema,
  },
  async input => {
    const {output} = await analyzeAndSuggestImprovementsPrompt(input);
    return output!;
  }
);
