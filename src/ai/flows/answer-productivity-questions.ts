'use server';

/**
 * @fileOverview Provides a conversational AI assistant that answers questions and performs tasks, using user data when necessary and maintaining conversation history.
 *
 * - answerProductivityQuestion - A function that handles answering productivity questions with conversation context.
 * - AnswerProductivityQuestionInput - The input type for the answerProductivityQuestion function.
 * - AnswerProductivityQuestionOutput - The return type for the answerProductivityQuestion function.
 */

import {ai} from '@/ai/genkit';
import { getExpenses } from '@/services/expenseService';
import { getNotes, addNote, updateNote, deleteNote } from '@/services/noteService';
import { getTodos, addTodo, updateTodo, deleteTodo } from '@/services/todoService';
import {z} from 'genkit';

// This represents the history format from the client
const HistoryMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const AnswerProductivityQuestionInputSchema = z.object({
  userId: z.string().describe("The authenticated user's ID."),
  question: z.string().describe('The latest message from the user.'),
  history: z.array(HistoryMessageSchema).describe("The conversation history so far."),
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

const UpdateNoteInputSchema = z.object({
    noteId: z.string().describe("The ID of the note to update."),
    updates: z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }).describe("An object containing the fields to update.")
});

const DeleteNoteInputSchema = z.object({
    noteId: z.string().describe("The ID of the note to delete."),
});

const AddTodoInputSchema = z.object({
  title: z.string().describe("The title of the task."),
  priority: z.enum(['low', 'medium', 'high']).describe("The priority of the task."),
  dueDate: z.string().nullable().describe("The due date in ISO 8601 format. Can be null if not set.").optional(),
  content: z.string().describe("The content or description for the task. Can be an empty string.").optional(),
  status: z.enum(['todo', 'in-progress', 'done']).default('todo').describe("The status of the task."),
});

const UpdateTodoInputSchema = z.object({
  taskId: z.string().describe("The ID of the task to update."),
  updates: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    status: z.enum(['todo', 'in-progress', 'done']).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    dueDate: z.string().nullable().optional().describe("The new due date in ISO 8601 format, or null to remove it."),
  }).describe("An object containing the fields to update.")
});

const DeleteTodoInputSchema = z.object({
  taskId: z.string().describe("The ID of the task to delete."),
});


export async function answerProductivityQuestion(input: AnswerProductivityQuestionInput): Promise<AnswerProductivityQuestionOutput> {
  return answerProductivityQuestionFlow(input);
}

const answerProductivityQuestionFlow = ai.defineFlow(
  {
    name: 'answerProductivityQuestionFlow',
    inputSchema: AnswerProductivityQuestionInputSchema,
    outputSchema: AnswerProductivityQuestionOutputSchema,
  },
  async (input) => {
    const { userId } = input;

    // Define tools within the flow to capture the userId context
    const getExpensesTool = ai.defineTool({
        name: 'getExpenses',
        description: "Get a list of the user's recent financial transactions.",
        outputSchema: z.array(TransactionSchema),
    }, async () => getExpenses(userId));

    const getTodosTool = ai.defineTool({
        name: 'getTodos',
        description: "Get the user's current list of to-do items.",
        outputSchema: z.array(TodoSchema),
    }, async () => getTodos(userId));

    const getNotesTool = ai.defineTool({
        name: 'getNotes',
        description: "Get the user's saved notes.",
        outputSchema: z.array(NoteSchema),
    }, async () => getNotes(userId));

    const addNoteTool = ai.defineTool({
      name: 'addNote',
      description: "Add a new note to the user's notes.",
      inputSchema: AddNoteInputSchema,
      outputSchema: NoteSchema,
    }, async (toolInput) => addNote(userId, toolInput));

    const updateNoteTool = ai.defineTool({
        name: 'updateNote',
        description: "Update an existing note. Use this to change title, content, or tags.",
        inputSchema: UpdateNoteInputSchema,
        outputSchema: z.union([NoteSchema, z.null()]),
    }, async (toolInput) => updateNote(userId, toolInput.noteId, toolInput.updates));

    const deleteNoteTool = ai.defineTool({
        name: 'deleteNote',
        description: "Delete a note from the user's list.",
        inputSchema: DeleteNoteInputSchema,
        outputSchema: z.object({ success: z.boolean() }),
    }, async (toolInput) => deleteNote(userId, toolInput.noteId));


    const addTodoTool = ai.defineTool({
      name: 'addTodo',
      description: "Add a new to-do item to the user's list. Default status is 'todo'.",
      inputSchema: AddTodoInputSchema,
      outputSchema: TodoSchema,
    }, async (toolInput) => addTodo(userId, toolInput));

    const updateTodoTool = ai.defineTool({
        name: 'updateTodo',
        description: "Update an existing to-do item. Use this to change status, priority, title, etc.",
        inputSchema: UpdateTodoInputSchema,
        outputSchema: z.union([TodoSchema, z.null()]),
    }, async (toolInput) => updateTodo(userId, toolInput.taskId, toolInput.updates));

    const deleteTodoTool = ai.defineTool({
        name: 'deleteTodo',
        description: "Delete a to-do item from the user's list.",
        inputSchema: DeleteTodoInputSchema,
        outputSchema: z.object({ success: z.boolean() }),
    }, async (toolInput) => deleteTodo(userId, toolInput.taskId));


    const prompt = ai.definePrompt({
      name: 'answerProductivityQuestionPrompt',
      input: {schema: z.object({ question: z.string() })},
      output: {schema: AnswerProductivityQuestionOutputSchema},
      tools: [getExpensesTool, getTodosTool, getNotesTool, addNoteTool, addTodoTool, updateTodoTool, deleteTodoTool, updateNoteTool, deleteNoteTool],
      system: `You are a powerful and friendly AI assistant for a "Life OS" application. Your main goal is to help users manage their life and be more productive.

You have access to a set of tools to interact with the user's data:
- You can retrieve their expenses, to-do lists, and notes.
- You can add, update, and delete to-do items and notes on their behalf.
- You can also analyze their data to provide personalized suggestions for improvement if they ask for it.

When a user asks a question, first determine if you need to use a tool based on the current question and the conversation history.
- If they ask about their data (e.g., "what are my outstanding tasks?", "how much did I spend on food?"), use the appropriate 'get' tool.
- If they ask you to create something (e.g., "add a task to buy milk", "create a note about my project idea"), use the appropriate 'add' tool.
- If they ask you to change something (e.g., "mark 'buy milk' as done", "change priority of Q3 report to low", "update my note about the meeting"), use the 'update' tool. You will likely need to get the list of todos or notes first to find the correct ID.
- If they ask you to remove something (e.g., "delete the task about the dentist", "remove my recipe note"), use the 'delete' tool. You will likely need to get the list of todos or notes first to find the correct ID.
- If the question is general, answer it without using a tool.
- If the user asks for suggestions, use the 'get' tools to retrieve relevant data and provide actionable advice.

When you use a tool to get data, present the information to the user in a clear, summarized, and easy-to-read format. Don't just dump the raw data.
When you use a tool to add, update, or delete data, always confirm the action with the user by telling them what you've done (e.g., "I've added 'Buy milk' to your to-do list.", "I've updated your meeting notes.", "I've deleted the task 'Schedule dentist appointment'.").

Always be friendly, concise, and helpful in your responses. Use the conversation history to understand context.`,
      prompt: `{{{question}}}`,
    });
    
    // Map client-side history to Genkit's message format
    const history = input.history.map((msg) => ({
      role: msg.role === 'assistant' ? ('model' as const) : ('user' as const),
      content: [{ text: msg.content }],
    }));
    
    // No longer need a custom toolCallback
    const { output } = await prompt(
      { question: input.question },
      { history }
    );
    
    return output!;
  }
);
