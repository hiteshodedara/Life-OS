'use server';
import { db } from '@/lib/firebase';
import type { Transaction } from '@/lib/types';
import { collection, getDocs, addDoc, doc, getDoc, query, orderBy, Timestamp } from 'firebase/firestore';

// Helper
const fromFirestoreToTransaction = (docSnap: any): Transaction => {
    const data = docSnap.data() || {};
    // Ensure date is handled safely, checking if it's a Firestore Timestamp
    const date = data.date instanceof Timestamp 
        ? data.date.toDate().toISOString() 
        : new Date().toISOString();

    return {
        id: docSnap.id,
        type: data.type || 'expense', // Provide defaults to prevent crashes
        category: data.category || 'Uncategorized',
        amount: data.amount || 0,
        date: date,
        description: data.description || '',
    };
};

export async function getExpenses(): Promise<Transaction[]> {
    const transCol = collection(db, 'transactions');
    const q = query(transCol, orderBy('date', 'desc'));
    const transSnapshot = await getDocs(q);
    return transSnapshot.docs.map(fromFirestoreToTransaction);
}

// The form will pass string values, so we need to parse them.
type AddTransactionInput = {
    type: 'income' | 'expense';
    category: string;
    amount: string; // from form
    description: string;
    date: string; // from form
}
export async function addTransaction(transaction: AddTransactionInput): Promise<Transaction> {
    const newTransactionData = {
        ...transaction,
        amount: parseFloat(transaction.amount),
        date: new Date(transaction.date),
    };
    const newTransRef = await addDoc(collection(db, 'transactions'), newTransactionData);
    const newTransSnap = await getDoc(newTransRef);
    return fromFirestoreToTransaction(newTransSnap);
}
