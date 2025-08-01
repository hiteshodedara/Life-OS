'use server';
/**
 * @fileOverview A flow that generates a programming joke.
 *
 * - generateJoke - A function that returns a joke.
 * - generateJokeSecure - A function that returns a joke using provided API key.
 * - GenerateJokeOutput - The return type for the generateJoke function.
 */

import {ai, createAIWithKey} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateJokeOutputSchema = z.object({
  joke: z.string().describe('A short, SFW, programming-related joke.'),
});
export type GenerateJokeOutput = z.infer<typeof GenerateJokeOutputSchema>;

export async function generateJoke(): Promise<GenerateJokeOutput> {
  return generateJokeFlow();
}

// Secure version that accepts API key
export async function generateJokeSecure(apiKey: string): Promise<GenerateJokeOutput> {
  try {
    const secureAI = createAIWithKey(apiKey);
    return generateJokeFlowSecure(secureAI);
  } catch (error) {
    console.error('Error in generateJokeSecure:', error);
    throw new Error('Failed to generate joke: Invalid API key or configuration');
  }
}

const createPrompt = (aiInstance: any) => aiInstance.definePrompt({
  name: 'generateJokePrompt',
  output: {schema: GenerateJokeOutputSchema},
  prompt: `Tell me a short, clever, safe-for-work joke about programming or technology.`,
});

const prompt = createPrompt(ai);

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

// Secure flow using provided AI instance
const generateJokeFlowSecure = (secureAI: any) => secureAI.defineFlow(
  {
    name: 'generateJokeFlowSecure',
    outputSchema: GenerateJokeOutputSchema,
  },
  async () => {
    const securePrompt = createPrompt(secureAI);
    const {output} = await securePrompt();
    return output!;
  }
);
