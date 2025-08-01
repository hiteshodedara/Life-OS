import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Default configuration using environment variable
export const ai = genkit({
  plugins: [googleAI({apiKey: process.env.GEMINI_API_KEY})],
  model: 'googleai/gemini-2.0-flash',
});

// Secure configuration that accepts API key as parameter
export function createAIWithKey(apiKey: string) {
  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
    throw new Error('Valid API key is required');
  }
  
  // Validate that it looks like a valid Gemini API key
  if (!apiKey.startsWith('AIza')) {
    throw new Error('Invalid Gemini API key format');
  }
  
  return genkit({
    plugins: [googleAI({apiKey: apiKey.trim()})],
    model: 'googleai/gemini-2.0-flash',
  });
}
