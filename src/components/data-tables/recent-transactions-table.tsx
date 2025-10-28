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
        {data.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">{transaction.description}</TableCell>
            <TableCell>
              <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'}
                className={transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
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
