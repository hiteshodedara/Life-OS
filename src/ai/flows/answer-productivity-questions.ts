'use server';

/**
 * @fileOverview Provides an AI assistant that answers questions, using user data when necessary.
 *
 * - answerProductivityQuestion - A function that handles answering productivity questions.
 * - AnswerProductivityQuestionInput - The input type for the answerProductivityQuestion function.
 * - AnswerProductivityQuestionOutput - The return type for the answerProductivityQuestion function.
 */

import {ai} from '@/ai/genkit';
import { getExpenses } from '@/services/expenseService';
import { getNotes } from '@/services/noteService';
import { getTodos } from '@/services/todoService';
import {z} from 'genkit';

const AnswerProductivityQuestionInputSchema = z.object({
  question: z.string().describe('The productivity or life-related question to be answered.'),
});
export type AnswerProductivityQuestionInput = z.infer<typeof AnswerProductivityQuestionInputSchema>;

const AnswerProductivityQuestionOutputSchema = z.object({
  answer: z.string().describe('The AI assistant answer to the question.'),
});
export type AnswerProductivityQuestionOutput = z.infer<typeof AnswerProductivityQuestionOutputSchema>;

// Schemas for tool output
const TransactionSchema = z.object({
    id: z.string(),
    type: z.enum(['income', 'expense']),
    category: z.string(),
    amount: z.number(),
    date: z.string(),
    description: z.string(),
});

const TodoSchema = z.object({
    id: z.string(),
    title: z.string(),
    status: z.enum(['todo', 'in-progress', 'done']),
    priority: z.enum(['low', 'medium', 'high']),
    dueDate: z.string().nullable(),
    content: z.string().optional(),
});

const NoteSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    tags: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export async function answerProductivityQuestion(input: AnswerProductivityQuestionInput): Promise<AnswerProductivityQuestionOutput> {
  return answerProductivityQuestionFlow(input);
}

const getExpensesTool = ai.defineTool({
    name: 'getExpenses',
    description: "Get a list of the user's recent financial transactions.",
    outputSchema: z.array(TransactionSchema),
  },
  async () => getExpenses()
);

const getTodosTool = ai.defineTool({
    name: 'getTodos',
    description: "Get the user's current list of to-do items.",
    outputSchema: z.array(TodoSchema),
  },
  async () => getTodos()
);

const getNotesTool = ai.defineTool({
    name: 'getNotes',
    description: "Get the user's saved notes.",
    outputSchema: z.array(NoteSchema),
  },
  async () => getNotes()
);

const prompt = ai.definePrompt({
  name: 'answerProductivityQuestionPrompt',
  input: {schema: AnswerProductivityQuestionInputSchema},
  output: {schema: AnswerProductivityQuestionOutputSchema},
  tools: [getExpensesTool, getTodosTool, getNotesTool],
  system: `You are a helpful AI assistant for a "Life OS" application. Your goal is to help users be more productive.
You have access to the user's data through tools, including their expenses, to-do list, and notes.
When a user asks a question, use the available tools if necessary to provide a relevant and accurate answer.
If the user's question is general, you can answer it directly.
Be friendly, concise, and helpful.`,
  prompt: `{{{question}}}`,
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
