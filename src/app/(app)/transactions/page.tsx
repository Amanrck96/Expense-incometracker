import { getCustomers, getExpenses, getIncomes, getItems } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpensesTable } from "@/components/data-tables/expenses-table";
import { IncomesTable } from "@/components/data-tables/incomes-table";
import { AddExpenseForm } from "@/components/forms/expense-form";
import { AddIncomeForm } from "@/components/forms/income-form";

export default async function TransactionsPage() {
  const [expenses, incomes, customers, items] = await Promise.all([
    getExpenses(),
    getIncomes(),
    getCustomers(),
    getItems(),
  ]);

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
          </TabsList>
          <div className="flex gap-2">
             <AddExpenseForm customers={customers} items={items} />
             <AddIncomeForm customers={customers} />
          </div>
        </div>
        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>All Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpensesTable data={expenses} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="incomes">
          <Card>
            <CardHeader>
              <CardTitle>All Incomes</CardTitle>
            </CardHeader>
            <CardContent>
              <IncomesTable data={incomes} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageHeader>
  );
}
