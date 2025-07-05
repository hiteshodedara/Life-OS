
'use client'

import { mockTransactions } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useSettings } from "@/contexts/SettingsContext";
import { formatCurrency } from "@/lib/utils";

export default function RecentTransactions() {
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
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.slice(0, 5).map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  <div className="font-medium">{t.description}</div>
                  <div className="text-sm text-muted-foreground">{new Date(t.date).toLocaleDateString()}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{t.category}</Badge>
                </TableCell>
                <TableCell className={cn("text-right", t.type === 'income' ? 'text-green-600' : 'text-destructive-foreground bg-destructive/10 rounded-md')}>
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
