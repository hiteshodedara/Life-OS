import type { Transaction, Todo, Note } from '@/lib/types';

export const mockTransactions: Transaction[] = [
  { id: '1', type: 'income', category: 'Salary', amount: 5000, date: new Date(new Date().setDate(1)).toISOString(), description: 'Monthly Salary' },
  { id: '2', type: 'expense', category: 'Groceries', amount: 150.75, date: new Date(new Date().setDate(2)).toISOString(), description: 'Weekly groceries' },
  { id: '3', type: 'expense', category: 'Utilities', amount: 120, date: new Date(new Date().setDate(3)).toISOString(), description: 'Electricity Bill' },
  { id: '4', type: 'expense', category: 'Transport', amount: 55.50, date: new Date(new Date().setDate(4)).toISOString(), description: 'Gasoline' },
  { id: '5', type: 'expense', category: 'Food', amount: 45.20, date: new Date(new Date().setDate(5)).toISOString(), description: 'Lunch with colleagues' },
  { id: '6', type: 'expense', category: 'Entertainment', amount: 78, date: new Date(new Date().setDate(6)).toISOString(), description: 'Movie tickets' },
  { id: '7', type: 'income', category: 'Freelance', amount: 750, date: new Date(new Date().setDate(10)).toISOString(), description: 'Web design project' },
  { id: '8', type: 'expense', category: 'Shopping', amount: 250, date: new Date(new Date().setDate(12)).toISOString(), description: 'New clothes' },
];

export const mockTodos: Todo[] = [
  { id: '1', title: 'Finalize Q3 report', status: 'in-progress', priority: 'high', dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), content: 'Review P&L and write executive summary.' },
  { id: '2', title: 'Schedule dentist appointment', status: 'todo', priority: 'medium', dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(), content: "Call Dr. Smith's office for a check-up and cleaning." },
  { id: '3', title: 'Buy birthday gift for Sarah', status: 'todo', priority: 'high', dueDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(), content: 'She likes books or candles.' },
  { id: '4', title: 'Complete Next.js tutorial', status: 'done', priority: 'low', dueDate: '', content: 'Finished the course on the App Router.' },
  { id: '5', title: 'Draft project proposal', status: 'in-progress', priority: 'high', dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(), content: 'Outline the scope, timeline, and budget for Project Phoenix.' },
  { id: '6', title: 'Weekly grocery shopping', status: 'todo', priority: 'medium', dueDate: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString(), content: 'Need milk, eggs, bread, chicken, and vegetables.' },
  { id: '7', 'title': 'Pay credit card bill', 'status': 'done', 'priority': 'high', dueDate: '', content: 'Paid the full balance for this month.' },
  { id: '8', title: 'Call Mom', status: 'todo', priority: 'low', dueDate: '', content: 'Check in and see how she is doing.' },
];

export const mockNotes: Note[] = [
  { id: '1', title: 'Meeting Notes 2024-07-20', content: 'Discussed project milestones. Key takeaways: ...', tags: ['work', 'project-x'], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', title: 'Recipe: Lemon Pasta', content: 'Ingredients: Lemon, pasta, garlic, olive oil...', tags: ['food', 'recipe'], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '3', title: 'Book Recommendations', content: '1. The Silent Patient\n2. Atomic Habits', tags: ['reading', 'personal'], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '4', title: 'Ideas for side project', content: 'A productivity app that combines todos, expenses and notes.', tags: ['ideas', 'dev'], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];
