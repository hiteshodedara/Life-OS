'use server';

/**
 * @fileOverview Provides an AI assistant that answers questions and performs tasks, using user data when necessary.
 *
 * - answerProductivityQuestion - A function that handles answering productivity questions.
 * - AnswerProductivityQuestionInput - The input type for the answerProductivityQuestion function.
 * - AnswerProductivityQuestionOutput - The return type for the answerProductivityQuestion function.
 */

import {ai} from '@/ai/genkit';
import { getExpenses } from '@/services/expenseService';
import { getNotes, addNote } from '@/services/noteService';
import { getTodos, addTodo } from '@/services/todoService';
import {z} from 'genkit';

const AnswerProductivityQuestionInputSchema = z.object({
  question: z.string().describe('The productivity or life-related question to be answered, or a command to create an item.'),
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
    dueDate: z.string().nullable().describe("The due date in ISO 8601 format. Can be null if not set."),
    content: z.string().describe("The content of the task."),
});

const NoteSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    tags: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
});

// Schemas for tool input
const AddNoteInputSchema = z.object({
  title: z.string().describe("The title of the note."),
  content: z.string().describe("The content of the note."),
  tags: z.array(z.string()).describe("An array of tags for the note.").optional(),
});

const AddTodoInputSchema = z.object({
  title: z.string().describe("The title of the task."),
  priority: z.enum(['low', 'medium', 'high']).describe("The priority of the task."),
  dueDate: z.string().describe("The due date in ISO 8601 format. Can be an empty string.").optional(),
  content: z.string().describe("The content or description for the task. Can be an empty string.").optional(),
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

const addNoteTool = ai.defineTool({
  name: 'addNote',
  description: "Add a new note to the user's notes.",
  inputSchema: AddNoteInputSchema,
  outputSchema: NoteSchema,
}, async (input) => addNote(input));

const addTodoTool = ai.defineTool({
  name: 'addTodo',
  description: "Add a new to-do item to the user's list.",
  inputSchema: AddTodoInputSchema,
  outputSchema: TodoSchema,
}, async (input) => addTodo(input));


const prompt = ai.definePrompt({
  name: 'answerProductivityQuestionPrompt',
  input: {schema: AnswerProductivityQuestionInputSchema},
  output: {schema: AnswerProductivityQuestionOutputSchema},
  tools: [getExpensesTool, getTodosTool, getNotesTool, addNoteTool, addTodoTool],
  system: `You are a powerful and friendly AI assistant for a "Life OS" application. Your main goal is to help users manage their life and be more productive.

You have access to a set of tools to interact with the user's data:
- You can retrieve their expenses, to-do lists, and notes.
- You can add new to-do items and notes on their behalf.

When a user asks a question, first determine if you need to use a tool.
- If they ask about their data (e.g., "what are my outstanding tasks?", "how much did I spend on food?"), use the appropriate 'get' tool.
- If they ask you to create something (e.g., "add a task to buy milk", "create a note about my project idea"), use the appropriate 'add' tool.
- If the question is general, answer it without using a tool.

When you use a tool to get data, present the information to the user in a clear, summarized, and easy-to-read format. Don't just dump the raw data.
When you use a tool to add data, always confirm the action with the user by telling them what you've done (e.g., "I've added 'Buy milk' to your to-do list.").

Always be friendly, concise, and helpful in your responses.`,
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
