import { getRecentTransactions, getStats } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { DashboardStats } from "@/components/dashboard-stats";
import { RecentTransactionsTable } from "@/components/data-tables/recent-transactions-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function DashboardPage() {
  const stats = await getStats();
  const recentTransactions = await getRecentTransactions(5);

  return (
    <PageHeader title="Dashboard" description="An overview of your financial activity.">
      <div className="space-y-8">
        <DashboardStats stats={stats} />
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTransactionsTable data={recentTransactions} />
          </CardContent>
        </Card>
      </div>
    </PageHeader>
  );
}
