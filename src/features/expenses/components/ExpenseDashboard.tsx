'use client'

import type { ElementType } from 'react';
import type { Transaction } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DollarSign, ArrowUp, ArrowDown, Euro, IndianRupee, JapaneseYen, PoundSterling } from "lucide-react"
import { useSettings } from "@/contexts/SettingsContext"
import { formatCurrency } from "@/lib/utils"

const currencyIcons: Record<string, ElementType> = {
  USD: DollarSign,
  EUR: Euro,
  JPY: JapaneseYen,
  GBP: PoundSterling,
  INR: IndianRupee,
};

type ExpenseDashboardProps = {
  transactions: Transaction[];
}

export default function ExpenseDashboard({ transactions }: ExpenseDashboardProps) {
  const { currency } = useSettings()
  const CurrencyIcon = currencyIcons[currency] || DollarSign;

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)
  const balance = totalIncome - totalExpenses

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <CurrencyIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(balance, currency)}</div>
          <p className="text-xs text-muted-foreground">Your current account balance</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <ArrowUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalIncome, currency)}</div>
          <p className="text-xs text-muted-foreground">Income this month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <ArrowDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalExpenses, currency)}</div>
          <p className="text-xs text-muted-foreground">Expenses this month</p>
        </CardContent>
      </Card>
    </div>
  )
}
