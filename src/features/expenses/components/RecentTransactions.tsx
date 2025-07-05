'use client'

import type { Transaction } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSettings } from "@/contexts/SettingsContext";
import { formatCurrency } from "@/lib/utils";

type RecentTransactionsProps = {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const { currency } = useSettings();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>A list of your recent income and expenses.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.slice(0, 5).map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  <div className="font-medium">{t.description}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(t.date).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline">{t.category}</Badge>
                </TableCell>
                <TableCell className={cn(
                  "text-right font-medium",
                  t.type === 'income' ? 'text-green-500' : 'text-destructive'
                )}>
                  {t.type === 'income' ? '+' : '-'}
                  {formatCurrency(t.amount, currency)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
