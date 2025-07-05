import PageHeader from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import ExpenseDashboard from "@/features/expenses/components/ExpenseDashboard"
import RecentTransactions from "@/features/expenses/components/RecentTransactions"
import CategoryChart from "@/features/expenses/components/CategoryChart"
import AddTransactionDialog from "@/features/expenses/components/AddTransactionDialog"

export default function ExpensesPage() {
  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title="Expenses"
        description="Track your income and spending."
        actions={
          <AddTransactionDialog>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </AddTransactionDialog>
        }
      />
      <div className="space-y-6">
        <ExpenseDashboard />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <RecentTransactions />
          </div>
          <div className="lg:col-span-3">
            <CategoryChart />
          </div>
        </div>
      </div>
    </div>
  )
}
