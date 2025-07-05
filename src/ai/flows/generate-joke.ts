'use server';
/**
 * @fileOverview A flow that generates a programming joke.
 *
 * - generateJoke - A function that returns a joke.
 * - GenerateJokeOutput - The return type for the generateJoke function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateJokeOutputSchema = z.object({
  joke: z.string().describe('A short, SFW, programming-related joke.'),
});
export type GenerateJokeOutput = z.infer<typeof GenerateJokeOutputSchema>;

export async function generateJoke(): Promise<GenerateJokeOutput> {
  return generateJokeFlow();
}

const prompt = ai.definePrompt({
  name: 'generateJokePrompt',
  output: {schema: GenerateJokeOutputSchema},
  prompt: `Tell me a short, clever, safe-for-work joke about programming or technology.`,
});

const generateJokeFlow = ai.defineFlow(
  {
    name: 'generateJokeFlow',
    outputSchema: GenerateJokeOutputSchema,
  },
  async () => {
    const {output} = await prompt();
    return output!;
  }
);
