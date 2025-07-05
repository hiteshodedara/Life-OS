'use server';
import { mockTransactions } from '@/lib/data';
import type { Transaction } from '@/lib/types';

export async function getExpenses(): Promise<Transaction[]> {
  return mockTransactions;
}
