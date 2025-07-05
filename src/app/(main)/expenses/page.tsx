'use client';

import { useState, useEffect } from 'react';
import PageHeader from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { PlusCircle, Loader2 } from "lucide-react"
import ExpenseDashboard from "@/features/expenses/components/ExpenseDashboard"
import RecentTransactions from "@/features/expenses/components/RecentTransactions"
import CategoryChart from "@/features/expenses/components/CategoryChart"
import AddTransactionDialog from "@/features/expenses/components/AddTransactionDialog"
import { getExpenses, addTransaction } from '@/services/expenseService';
import type { Transaction } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function ExpensesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const data = await getExpenses();
      setTransactions(data);
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Failed to load transactions. Make sure your Firebase configuration is correct." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (data: any) => {
    try {
      await addTransaction(data);
      toast({ title: "Success", description: "Transaction added." });
      fetchTransactions(); // Refetch transactions
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Failed to add transaction." });
    }
  }

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title="Expenses"
        description="Track your income and spending."
        actions={
          <AddTransactionDialog onSave={handleAddTransaction}>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </AddTransactionDialog>
        }
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="space-y-6">
          <ExpenseDashboard transactions={transactions} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <RecentTransactions transactions={transactions} />
            </div>
            <div className="lg:col-span-3">
              <CategoryChart transactions={transactions} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
