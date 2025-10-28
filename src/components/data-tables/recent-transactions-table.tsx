import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { AnyTransaction } from "@/lib/types";
import { format } from "date-fns";

type RecentTransactionsTableProps = {
  data: AnyTransaction[];
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export function RecentTransactionsTable({ data }: RecentTransactionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No transactions yet.
            </TableCell>
          </TableRow>
        )}
        {data.map((transaction, index) => (
          <TableRow key={transaction.id} className="fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <TableCell className="font-medium">{transaction.description}</TableCell>
            <TableCell>
              <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'}
                className={transaction.type === 'income' ? 'bg-green-700/20 text-green-500' : 'bg-red-700/20 text-red-500'}
              >
                {transaction.type}
              </Badge>
            </TableCell>
            <TableCell>{format(transaction.date, 'PPP')}</TableCell>
            <TableCell className="text-right">{formatCurrency(transaction.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
