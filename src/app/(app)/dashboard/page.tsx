import { getRecentTransactions, getStats } from "@/lib/data";
import { PageHeader } from "@/components/page-header";
import { DashboardStats } from "@/components/dashboard-stats";
import { RecentTransactionsTable } from "@/components/data-tables/recent-transactions-table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { OpeningBalanceForm } from "@/components/forms/opening-balance-form";
import { SystemSettingsForm } from "@/components/forms/system-settings-form";
import { AuditLogComponent } from "@/components/audit-log";
import { GitHubSync } from "@/components/github-sync";
import { ClearTransactionsButton } from "@/components/clear-transactions-button";
import { FinancialMetricsForm } from "@/components/financial-metrics-form";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const stats = await getStats();
  const recentTransactions = await getRecentTransactions(5);

  return (
    <PageHeader title="Dashboard" description="An overview of your financial activity.">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
        <GitHubSync />
        <SystemSettingsForm />
      </div>
        <DashboardStats stats={stats} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Transactions</CardTitle>
                    <ClearTransactionsButton />
                </CardHeader>
                <CardContent>
                    <RecentTransactionsTable data={recentTransactions} />
                </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Financial Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <FinancialMetricsForm initialData={stats} />
                    </CardContent>
                </Card>
            </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <AuditLogComponent />
        </div>
      </div>
    </PageHeader>
  );
}