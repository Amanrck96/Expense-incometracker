import { getCustomers, getExpenses, getIncomes, getItems } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpensesTable } from "@/components/data-tables/expenses-table";
import { IncomesTable } from "@/components/data-tables/incomes-table";
import { AddExpenseForm } from "@/components/forms/expense-form";
import { AddIncomeForm } from "@/components/forms/income-form";
import { BulkDeleteTransactions } from "@/components/forms/bulk-delete-transactions";

export const dynamic = 'force-dynamic';

export default async function TransactionsPage() {
  const [expenses, incomes, customers, items] = await Promise.all([
    getExpenses(),
    getIncomes(),
    getCustomers(),
    getItems(),
  ]);

  const creditExpenses = expenses.filter(e => e.isCredit);
  const creditIncomes = incomes.filter(i => i.isCredit);

  return (
    <PageHeader
      title="Transactions"
      description="Manage your expenses and incomes."
    >
      <Tabs defaultValue="expenses">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="incomes">Incomes</TabsTrigger>
            <TabsTrigger value="credit-expenses">Credit Expenses</TabsTrigger>
            <TabsTrigger value="credit-incomes">Credit Incomes</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
             <AddExpenseForm />
             <AddIncomeForm customers={customers} />
          </div>
        </div>
        <TabsContent value="expenses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Expenses</CardTitle>
              <BulkDeleteTransactions type="expense" />
            </CardHeader>
            <CardContent>
              <ExpensesTable data={expenses} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="incomes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Incomes</CardTitle>
              <BulkDeleteTransactions type="income" />
            </CardHeader>
            <CardContent>
              <IncomesTable data={incomes} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="credit-expenses">
          <Card>
            <CardHeader>
              <CardTitle>Credit Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpensesTable data={creditExpenses} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="credit-incomes">
          <Card>
            <CardHeader>
              <CardTitle>Credit Incomes</CardTitle>
            </CardHeader>
            <CardContent>
              <IncomesTable data={creditIncomes} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageHeader>
  );
}